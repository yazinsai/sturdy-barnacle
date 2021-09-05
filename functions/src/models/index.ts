import mongoose from 'mongoose';
 
import User from './user';
import Portfolio from './portfolio';
 
const connectDb = () => {
  if(process.env.DATABASE_URL == null || process.env.DATABASE_URL.length == 0)
    throw Error('Environment variable "DATABASE_URL" is undefined')
  
  return mongoose.connect(process.env.DATABASE_URL);
};

export { connectDb, User, Portfolio }