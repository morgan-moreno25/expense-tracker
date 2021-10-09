import { User } from '.prisma/client';

export interface LoginDto {
	email: string;
	password: string;
}

export interface RegisterDto {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface TokenResponseDto {
	success: boolean;
	data: {
		token: string;
	};
}

export interface UserResponseDto {
	success: boolean;
	data: {
		user: Partial<User>;
	};
}
