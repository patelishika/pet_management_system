import mongoose from 'mongoose';
import { ROLES } from '../schemas/enums.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    mobileNo: {
      type: String,
      unique: true,
      trim: true,
      match: /^[0-9]{10}$/,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ROLES,
      default: 'USER',
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

export const User = mongoose.model('User', userSchema);
