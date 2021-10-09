import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		console.log('********** REQUEST **********');
		console.log(`${req.method} ${req.originalUrl}`);
		console.log('Body: ', req.body);
		console.log('Query: ', req.query);
		res.on('finish', function (this: Response) {
			const now = new Date();
			const hours =
				now.getHours() > 9 ? `${now.getHours()}` : `0${now.getHours()}`;
			const minutes =
				now.getMinutes() > 9
					? `${now.getMinutes()}`
					: `0${now.getMinutes()}`;

			console.log(`${hours}:${minutes}`, this.statusCode);
			console.log('********* REQUEST END **********');
		});
		next();
	}
}
