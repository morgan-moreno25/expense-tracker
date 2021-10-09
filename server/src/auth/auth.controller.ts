import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import {
	LoginDto,
	RegisterDto,
	TokenResponseDto,
	UserResponseDto,
} from './auth.dto';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/login')
	@HttpCode(200)
	async login(@Body() body: LoginDto): Promise<TokenResponseDto> {
		const token = await this.authService.login(body);

		return {
			success: true,
			data: {
				token,
			},
		};
	}

	@Post('/register')
	@HttpCode(201)
	async register(@Body() body: RegisterDto): Promise<TokenResponseDto> {
		const token = await this.authService.register(body);

		return {
			success: true,
			data: {
				token,
			},
		};
	}

	@Get('me')
	@HttpCode(200)
	@UseGuards(AuthGuard)
	async loadUser(@Req() req: Request): Promise<UserResponseDto> {
		if (req.userId) {
			const user = await this.authService.loadUser(req.userId);

			return {
				success: true,
				data: {
					user,
				},
			};
		} else {
			throw new HttpException('No user id', HttpStatus.UNAUTHORIZED);
		}
	}
}
