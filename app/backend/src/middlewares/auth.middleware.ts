import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { authorization: token } = req.headers;

    if (!token) {
      return res.status(401).json({ message: 'Token not found!' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'jwt_srcret');

    req.body.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
