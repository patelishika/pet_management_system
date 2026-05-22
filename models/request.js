import mongoose from 'mongoose';
import { Pet } from './pet.js';
import { User } from './user.js';
import { REQUEST_STATUS } from '../schemas/enums.js';

const requestSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: Pet },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: User },
  status: {
    type: String,
    enum: REQUEST_STATUS,
    default: 'UNAPPROVED',
  },
});

export const Request = mongoose.model('Request', requestSchema);
