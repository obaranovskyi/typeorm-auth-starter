import { AppDataSource } from "./data-source"
import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth';
import trim from './middleware/trim';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(trim);

app.get('/', (_, res) => res.send('Hello World'));
app.use('/api/auth', authRoutes);


app.listen(process.env.PORT, async () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
  try {
    await AppDataSource.initialize();
    console.log('Database connected!');
  } catch (err) {
    console.log(err);
  }
})
