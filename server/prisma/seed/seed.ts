import { PrismaClient, TransactionType, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import config from '../../src/config';
import faker from 'faker';

async function generateDefaultPassword(): Promise<string> {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(config.getTestPassword(), salt);
}

async function clearDb(db: PrismaClient): Promise<void> {
	console.log('--- Clear Db: START ---');
	await db.transaction.deleteMany();
	await db.user.deleteMany();
	console.log('--- Clear Db: END ---');
}

async function generateUsers(db: PrismaClient): Promise<Array<string>> {
	let user: User;
	const createdUserIds: Array<string> = [];

	const password = await generateDefaultPassword();

	console.log('--- Create Users: START ---');
	// Create Admin User
	user = await db.user.create({
		data: {
			firstName: 'Admin',
			lastName: 'Test',
			avatar: faker.image.avatar(),
			email: 'admin@email.com',
			password,
		},
	});

	createdUserIds.push(user.id);

	// Create Users
	for (let i = 0; i < 25; i++) {
		user = await db.user.create({
			data: {
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				email: faker.internet.email(),
				avatar: faker.image.avatar(),
				password,
			},
		});

		createdUserIds.push(user.id);
	}
	console.log('--- Create Users: END ---');

	return createdUserIds;
}

async function generateTransactions(
	db: PrismaClient,
	userIds: Array<string>,
): Promise<void> {
	console.log('--- Create Transactions: START ---');
	for (let i = 0; i < 5000; i++) {
		await db.transaction.create({
			data: {
				date: faker.date.past(1),
				amount: Number(faker.finance.amount(0, 500, 2)),
				description: faker.lorem.sentence(),
				memo: faker.lorem.sentence(),
				type: faker.datatype.boolean()
					? TransactionType.INCOME
					: TransactionType.EXPENSE,
				userId: userIds[Math.floor(Math.random() * userIds.length)],
			},
		});
	}
	console.log('--- Create Transactions: END ---');
}

async function main() {
	const prisma = new PrismaClient();

	try {
		await clearDb(prisma);

		const userIds = await generateUsers(prisma);
		await generateTransactions(prisma, userIds);

		console.log('Database seeded successfully');
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

main();
