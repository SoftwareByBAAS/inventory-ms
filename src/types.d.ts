import { NextFunction, Request, Response } from 'express';

export type RequestHandler = (req: Request, res: Response, next: NextFunction) => void;

declare global {
    namespace Express {
        interface Request {
            limit?: number,
            offset?: number
        }
    }
}