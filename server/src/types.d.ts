import { Express } from 'express';

declare global {
	namespace Express {
		interface Request {
			userId?: number;
		}
	}
}

export interface DecodedToken {
	id: number;
}
