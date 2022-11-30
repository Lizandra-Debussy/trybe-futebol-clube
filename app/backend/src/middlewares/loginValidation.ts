import { Request, Response, NextFunction } from 'express';

export default function loginValidate(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  if (email === '' || !email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (password === '' || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  next();
}
