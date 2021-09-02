import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    accountStatus: {
      type: String,
      enum: ['active', 'inactive'],
      required: false,
      default: 'active'
    },
  },
  { timestamps: true },
);
 
const User = model('User', userSchema);
 
export default User;