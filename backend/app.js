import express from 'express';
import cors from 'cors';
import { connectDB } from './DB/Database.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import transactionRoutes from './Routers/Transactions.js';
import userRoutes from './Routers/userRouter.js';
import path from 'path';

dotenv.config({ path: './.env' });
const app = express();

const port = process.env.PORT;

connectDB();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('dev'));
app.use(bodyParser.json());

// Router
app.use('/api/v1', transactionRoutes);
app.use('/api/auth', userRoutes);

// Catch-all route
app.get('*', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
