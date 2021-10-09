import config from 'src/config';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { User } from '.prisma/client';

@Injectable()
export class AuthService {
	constructor(private readonly prisma: PrismaService) {}

	async login(body: LoginDto): Promise<string> {
		const { email, password } = body;

		const user = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (user) {
			const isMatch = await bcrypt.compare(password, user.password);

			if (isMatch) {
				const token = jwt.sign({ id: user.id }, config.getJwtSecret());

				return token;
			} else {
				throw new HttpException(
					'Invalid username or password',
					HttpStatus.UNAUTHORIZED,
				);
			}
		} else {
			throw new HttpException(
				'Invalid username or password',
				HttpStatus.UNAUTHORIZED,
			);
		}
	}

	async register(body: RegisterDto): Promise<string> {
		const { firstName, lastName, email, password } = body;

		let user = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);

			user = await this.prisma.user.create({
				data: {
					firstName,
					lastName,
					email,
					password: hash,
				},
			});

			const token = jwt.sign({ id: user.id }, config.getJwtSecret());

			return token;
		} else {
			throw new HttpException(
				'Email already in use',
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	async loadUser(userId: number): Promise<Partial<User>> {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				avatar: true,
				password: false,
			},
		});

		if (user) {
			return user;
		} else {
			throw new HttpException('User not found', HttpStatus.NO_CONTENT);
		}
	}
}
