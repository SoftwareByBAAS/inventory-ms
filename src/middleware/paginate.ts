import { Response, Request, NextFunction } from 'express';
import { asyncHandler } from './asyncHandler';

const paginate = asyncHandler(async (req, res, next) => {
		const { limit = "25", offset = "0" } = req.query;
		const limitInt = parseInt(limit as string);
		const offsetInt = parseInt(offset as string);

		req.limit = limitInt;
		req.offset = offsetInt;
		next();
	});

export default paginate;