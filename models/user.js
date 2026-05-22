import mongoose from 'mongoose';
import { ROLES } from '../schemas/enums';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 15,
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
      minlength: 6,
      maxlength: 10,
      trim: true,
      select: false,
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
