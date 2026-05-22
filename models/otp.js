import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  validate: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
    match: /^[A-Za-z0-9]{6}$/,
  },
});

export const Otp = mongoose.model('Otp', otpSchema);
