import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import User from '../entities/User';

export default async (req: Request, res: Response, next: NextFunction) => {
  const ERROR_MESSAGE = 'Unauthenticated';

  try {
    const token = req.cookies.token;
    if (!token) throw new Error(ERROR_MESSAGE)

    const { username }: any = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findOneBy({ username });
    if (!user) throw new Error(ERROR_MESSAGE);

    res.locals.user = user;

    return next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: ERROR_MESSAGE });
  }
}
