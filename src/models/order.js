import mongoose from 'mongoose';
import { Pet } from './pet.js';
import { User } from './user.js';

const orderSchema = new mongoose.Schema(
  {
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Pet,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  },
  {
    versionKey: false,
  }
);

export const Order = mongoose.model('Order', orderSchema);
