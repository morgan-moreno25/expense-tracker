import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
	use(_req: Request, res: Response, next: NextFunction) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Credentials', 'true');
		res.setHeader(
			'Access-Control-Allow-Headers',
			'Access-Control-Allow-Headers, Origin, Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
		);
		res.setHeader(
			'Access-Control-Allow-Methods',
			'GET, POST, PATCH, PUT, DELETE, OPTIONS',
		);

		next();
	}
}
