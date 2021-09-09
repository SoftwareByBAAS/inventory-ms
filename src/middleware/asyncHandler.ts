import { RequestHandler } from '../types';
import { Request, NextFunction, Response } from 'express';

export const asyncHandler =
	(fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
		try {
			return Promise.resolve(fn(req, res, next));
		} catch (error) {
			return next(error);
		}
	};