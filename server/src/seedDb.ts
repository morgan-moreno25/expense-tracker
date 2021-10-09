import { PrismaClient, User, TransactionType } from '@prisma/client';
import config from './config';
import bcrypt from 'bcryptjs';
import faker from 'faker';

(async () => {
	let _user: User;

	let userIds: number[] = [];

	function addUserId(id: number) {
		userIds.push(id);
	}
	function getRandomUserId(): number {
		let random = Math.floor(Math.random() * userIds.length);

		return userIds[random];
	}

	try {
		const prisma = new PrismaClient();

		// Set up base password to use with all accounts
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(config.getTestPassword(), salt);

		// Delete data in the database
		console.log('Deleting previous data...');
		await prisma.transaction.deleteMany();
		await prisma.user.deleteMany();
		console.log('Data deleted');

		console.log('--------------------------------------');

		// Create default user
		console.log('Creating superuser...');
		_user = await prisma.user.create({
			data: {
				firstName: 'Super',
				lastName: 'User',
				avatar: faker.image.avatar(),
				email: 'super@email.com',
				password: hash,
			},
		});

		addUserId(_user.id);
		console.log('Superuser created');

		console.log('--------------------------------------');

		// console.log('Creating other users...');
		// // Create other users
		// for (let i = 0; i < 25; i++) {
		// 	_user = await prisma.user.create({
		// 		data: {
		// 			firstName: faker.name.firstName(),
		// 			lastName: faker.name.lastName(),
		// 			email: faker.internet.email(),
		// 			avatar: faker.image.avatar(),
		// 			password: hash,
		// 		},
		// 	});

		// 	addUserId(_user.id);
		// }
		// console.log('Other users created');

		// console.log('--------------------------------------');

		console.log('Creating transactions...');
		// Create transactions
		for (let i = 0; i < 1000; i++) {
			await prisma.transaction.create({
				data: {
					date: faker.date.past(1),
					amount: Number(faker.finance.amount(0, 500, 2)),
					description: faker.lorem.sentence(),
					memo: faker.lorem.sentence(),
					userId: getRandomUserId(),
					type: faker.datatype.boolean()
						? TransactionType.INCOME
						: TransactionType.EXPENSE,
				},
			});
		}
		console.log('Transactions created');

		console.log('--------------------------------------');

		console.log('Database seeded!');
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
})();
