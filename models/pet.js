import mongoose from 'mongoose';
import { User } from './user.js';
import { PET_CATEGORY, PET_STATUS } from '../schemas/enums.js';

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 10,
      trim: true,
    },
    description: {
      type: String,
      minlength: 20,
      maxlength: 100,
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
      minlength: 3,
      maxlength: 10,
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
      type: String,
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
