import { ErrorRequestHandler } from 'express';

export function errorHandler(err, req, res, next): ErrorRequestHandler {
    if (err) {
        console.error(err.stack);
        return res.status(500).json({error: 'Something broke!'});
    } else {
        return next();
    }
}
