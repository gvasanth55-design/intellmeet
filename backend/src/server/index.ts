import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import connectDB from '../config/database';
import { logger } from '../logger';

const PORT = process.env.PORT || 5000;

async function bootstrap(): Promise<void> {
  await connectDB();
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}

bootstrap().catch((err) => {
  logger.error('Failed to start server', err);
  process.exit(1);
});
