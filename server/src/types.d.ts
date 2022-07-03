import { Express } from 'express';

declare global {
	namespace Express {
		interface Request {
			userId?: string;
		}
	}
}

export interface DecodedToken {
	id: string;
}
