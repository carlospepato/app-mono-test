import dotenv from 'dotenv';

dotenv.config();

interface Config{
  port: number;
  dbUrl: string;
  jwtSecret: string;
}

export const config : Config = {
  port: parseInt(process.env.PORT || '3000'),
  dbUrl: process.env.DB_URL || '',
  jwtSecret: process.env.JWT_SECRET || 'DialogTimeline'
}