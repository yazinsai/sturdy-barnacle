import mongoose from "mongoose";

class Database {
  connect() {
    if(process.env.DATABASE_URL == null || 
      process.env.DATABASE_URL.length == 0) {
        throw Error('Environment variable "DATABASE_URL" is undefined')
    }
    
    return mongoose.connect(process.env.DATABASE_URL);
  }
}

module.exports = new Database();