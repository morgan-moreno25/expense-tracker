import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();

		const [status, message] =
			exception instanceof HttpException
				? [exception.getStatus(), exception.message]
				: [HttpStatus.INTERNAL_SERVER_ERROR, 'Server Error'];

		response.status(status).json({
			success: false,
			data: {
				message,
			},
		});
	}
}
