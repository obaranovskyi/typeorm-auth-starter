import { isEmpty, validate } from "class-validator";
import { Request, Response, Router } from "express";
import User from "../entities/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import auth from '../middleware/auth';



const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  let validationErrors: any = {};
  const emailUser: any = await User.findOneBy({ email });
  const usernameUser = await User.findOneBy({ username });

  if (emailUser) validationErrors.email = 'Email is already taken';
  if (usernameUser) validationErrors.username = 'Email is already taken';

  if (Object.keys(validationErrors).length) {
    return res.status(400).json(validationErrors);
  }

  try {
    const user = User.create({ email, username, password });

    const errors = await validate(user);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    await user.save();

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err)
  }
}

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {

    let errors: any = {};

    if (isEmpty(username)) errors.username = 'Username must not be empty';
    if (isEmpty(password)) errors.password = 'Password must not be empty';

    if (Object.keys(errors).length) return res.status(400).json(errors);

    const user = await User.findOneBy({ username });

    if (!user) return res.status(404).json({ error: 'User not found' })

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) return res.status(401).json({ password: 'Password is incorrect' });

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.set('Set-Cookie', cookie.serialize('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production', // ! as we work on http not on https
      maxAge: 3600,
      path: '/'
    }));

    return res.json(user.toJSON());

  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

const me = async (req: Request, res: Response) => {
  return res.json(res.locals.user);
}

const logout = async (_: Request, res: Response) => {
  res.set('Set-Cookie', cookie.serialize('token', '', {
    httpOnly: true,
    sameSite: 'strict',
    expires: new Date(0),
    path: '/'
  }));

  return res.status(200).json({ success: true })
}


const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, me); // an example of auth middleware
router.get('/logout', auth, logout);

export default router;
