import mongoose from 'mongoose';
import { User } from './user.js';
import { PET_CATEGORY, PET_STATUS } from '../schemas/enums.js';

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      enum: PET_CATEGORY,
      required: true,
    },
    breed: {
      type: String,
      trim: true,
      required: true,
    },
    age: {
      type: Number,
      trim: true,
      positive: true,
    },
    height: {
      type: Number,
      trim: true,
      positive: true,
    },
    weight: {
      type: Number,
      trim: true,
      positive: true,
    },
    color: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      positive: true,
    },
    status: {
      type: String,
      enum: PET_STATUS,
      default: 'UNAPPROVED',
    },
    images: {
      type: [String],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    versionKey: false,
  }
);

export const Pet = mongoose.model('Pet', petSchema);
