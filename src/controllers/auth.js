import { loginSchema, registerSchema } from '../schemas/user.js';
import { User } from '../models/user.js';
import { Otp } from '../models/otp.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/token.js';
import { otpSchema } from '../schemas/otp.js';
import { generateOtp } from '../utils/otp.js';
import { hashPassword, hidePassword, verifyPassword } from '../utils/password.js';
import {
  signInService,
  signUpService,
  verifyOtpService,
} from '../services/auth/index.js';

export const signUp = async (req, res) => {
  try {
    const { data, success, error } = registerSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ message: 'Invalid request', error: error });
    }

    if (!data.email && !data.mobileNo) {
      return res
        .status(400)
        .json({ message: 'Either email or mobile number is compulsory' });
    }

    const result = await signUpService(data);

    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }

    return res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  } catch (error) {
    console.log('sign up error: ', error);
    return res.status(500).json({ message: 'Internal server error', error: error });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { data, success, error } = otpSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ message: 'Invalid request', error: error });
    }

    const result = await verifyOtpService(data);

    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }

    const token = generateToken({
      id: user._id,
      email: user.email,
      mobileNo: user.mobileNo,
      role: user.role,
    });

    return res.status(result.status).json({
      message: result.message,
      data: result.data,
      token,
    });
  } catch (error) {
    console.log('verify otp error: ', error);
    return res.status(500).json({ message: 'Internal server error', error: error });
  }
};

export const signIn = async (req, res) => {
  try {
    const { data, success, error } = loginSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ message: 'Invalid request', error: error });
    }

    const result = await signInService(data);

    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }

    const token = generateToken({
      id: user._id,
      email: user.email,
      mobileNo: user.mobileNo,
      role: user.role,
    });

    return res
      .status(result.status)
      .json({ message: result.message, data: result.data, token });
  } catch (error) {
    console.log('sign in error: ', error);
    return res.status(500).json({ message: 'Internal server error', error: error });
  }
};
