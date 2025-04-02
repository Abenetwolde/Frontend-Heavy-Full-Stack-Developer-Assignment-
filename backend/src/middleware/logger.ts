// src/middleware/logger.ts
import { Request, Response, NextFunction } from 'express';
import winston from 'winston';

// Configure Winston logger
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
});

// Middleware function
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  // Log request
  logger.info({
    message: 'Request received',
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
    timestamp: new Date().toISOString()
  });

  // Capture the original res.json function
  const originalJson = res.json;

  // Override res.json to log the response
  res.json = function (body) {
    const duration = Date.now() - startTime;
    
    logger.info({
      message: 'Response sent',
      method: req.method,
      url: req.url,
      status: res.statusCode,
      responseTime: `${duration}ms`,
      body: body,
      timestamp: new Date().toISOString()
    });

    return originalJson.call(this, body);
  };

  // Handle errors
  res.on('error', (error) => {
    logger.error({
      message: 'Response error',
      method: req.method,
      url: req.url,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  });

  next();
};

export default requestLogger;