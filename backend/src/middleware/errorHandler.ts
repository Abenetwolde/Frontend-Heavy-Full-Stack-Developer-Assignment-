// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'express-validator';
import winston from 'winston';

// Define custom error interface
interface CustomError extends Error {
  statusCode?: number;
  code?: string;
  details?: unknown;
}

// Error response structure for frontend
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
    timestamp: string;
  };
}

// Logger setup (assuming it's already configured from previous example)
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.json()
  ),
  transports: [
    // Log to console
    new winston.transports.Console(),
    // Log to file
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    })
  ]
})
class ErrorHandler {
  // Centralized error handling middleware
  static handleError(
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const statusCode = err.statusCode || 500;
    const errorCode = err.code || 'INTERNAL_SERVER_ERROR';
    const message = err.message || 'Something went wrong';
    const details = err.details || null;

    // Log the error
    logger.error({
      message: 'Error occurred',
      error: {
        name: err.name,
        message: err.message,
        stack: err.stack,
        statusCode,
        errorCode,
      },
      request: {
        method: req.method,
        url: req.url,
        body: req.body,
        params: req.params,
        query: req.query,
      },
      timestamp: new Date().toISOString(),
    });

    // Prepare frontend-friendly response
    const errorResponse: ErrorResponse = {
      success: false,
      error: {
        code: errorCode,
        message,
        details,
        timestamp: new Date().toISOString(),
      },
    };

    res.status(statusCode).json(errorResponse);
  }

  // Utility to create custom errors
  static createError(
    statusCode: number,
    message: string,
    code: string,
    details?: unknown
  ): CustomError {
    const error = new Error(message) as CustomError;
    error.statusCode = statusCode;
    error.code = code;
    error.details = details;
    return error;
  }

  // Catch async errors wrapper
  static catchAsync(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}

// Specific error handlers
const handleValidationError = (err: ValidationError[]): CustomError => {
  return ErrorHandler.createError(
    400,
    'Validation failed',
    'VALIDATION_ERROR',
    err.map((e:any) => ({
      param: e.param,
      message: e.msg,
      value: e.value,
    }))
  );
};

const handleDatabaseError = (err: any): CustomError => {
  return ErrorHandler.createError(
    500,
    'Database operation failed',
    'DATABASE_ERROR',
    process.env.NODE_ENV === 'development' ? err.message : undefined
  );
};

// Main error handling middleware
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;

  // Handle specific error types
  if (Array.isArray(err) && err[0] ) {
    error = handleValidationError(err);
  } else if (err.name === 'PrismaClientKnownRequestError') {
    error = handleDatabaseError(err);
  }

  ErrorHandler.handleError(error, req, res, next);
};

export default errorHandler;
export { ErrorHandler };