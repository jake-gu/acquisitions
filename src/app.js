import express from 'express';
import helmet from 'helmet';
import cors from 'cors';  
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import logger from './utils/logger.js';
import authRoutes from './routes/auth.routes.js'; 
import 'dotenv/config';
import winston from 'winston';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

app.get('/', (req, res) => {
  logger.info('Hello from Acquisitions!');
  res.status(200).send('Hello from Acquisitions!');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() , uptime: process.uptime() });
});

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Acquisitions API!' });
});



app.use('/api/auth', authRoutes);

export default app;