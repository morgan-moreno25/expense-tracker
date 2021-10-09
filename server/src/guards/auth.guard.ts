import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import jwt from 'jsonwebtoken';
import config from 'src/config';
import { DecodedToken } from 'src/types';

@Injectable()
export class AuthGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		return (async () => {
			const req = context.switchToHttp().getRequest<Request>();

			let token: string | undefined;

			if (
				req.headers.authorization &&
				req.headers.authorization.startsWith('Bearer ')
			) {
				token = req.headers.authorization.split(' ')[1];
			}

			if (token) {
				try {
					const decodedToken = jwt.verify(
						token,
						config.getJwtSecret(),
					) as DecodedToken;

					req.userId = decodedToken.id;
					return true;
				} catch (error) {
					return false;
				}
			} else {
				return false;
			}
		})();
	}
}
