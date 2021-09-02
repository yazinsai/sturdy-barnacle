import { Schema, model } from 'mongoose';

const portfolioSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId, 
      ref: 'User'
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['model', 'custom'],
      required: true,
    },
  },
  { timestamps: true },
);
 
const Portfolio = model('Portfolio', portfolioSchema);
 
export default Portfolio;