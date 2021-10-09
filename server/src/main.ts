import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { CorsMiddleware } from './middleware/cors.middleware';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(new LoggerMiddleware().use);
	app.use(new CorsMiddleware().use);
	app.enableCors();
	await app.listen(3001);
}
bootstrap();
