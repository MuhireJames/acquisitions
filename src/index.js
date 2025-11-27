import express from 'express';
import logger from './config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';


const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
}));


app.get('/', (req, res) => {
  logger.info('Hello from acquisition');
  res.send('Welcome to the acquisition application!');
});
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' , timestamp:new Date().toISOString(),uptime:process.uptime()});
});

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Acquisition API is running' });
});

app.use('/api/auth',authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
