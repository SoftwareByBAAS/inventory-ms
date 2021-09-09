import { Request, Response, NextFunction } from 'express';
import ErrorResponse from '../utils/errorResponse';

type CustomError = NodeJS.ErrnoException | ErrorResponse;

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.log("Error Handling Middleware called")
    console.log('Path: ', req.path)
    console.error('Error: ', err)

    let error = { ...err };

    error.message = err.message;

    // Mongoose ObjectId error
    if (err.name === 'CastError') {
        const message = 'Resource not found';
        error = new ErrorResponse(message, 404);
    }

    // Mongoose duplicate key
    if ((err as NodeJS.ErrnoException).code === '11000') {
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 400);
    }
    
    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = 'Mongoose validation error';
        error = new ErrorResponse(message, 400);
    }
    
    res.status((error as ErrorResponse).statusCode || 500).json({
        success: false,
        message: error.message || 'Server Error',
        error: error,
    });
  }

export default errorHandler;