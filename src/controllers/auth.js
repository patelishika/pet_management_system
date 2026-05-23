import { loginSchema, registerSchema } from '../schemas/user.js';
import { User } from '../models/user.js';
import { Otp } from '../models/otp.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/token.js';
import { otpSchema } from '../schemas/otp.js';
import { generateOtp } from '../utils/otp.js';
import { hashPassword, hidePassword, verifyPassword } from '../utils/password.js';
import { signUpService } from '../services/auth/index.js';

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

    const otpRecord = await Otp.findOne({
      validate: data.validate,
    });

    if (!otpRecord || otpRecord.value !== data.value) {
      return res.status(400).json({ message: 'Invalid otp' });
    }

    const user = await User.findOne({
      $or: [{ email: data.validate }, { mobileNo: data.validate }],
    });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const userResponse = hidePassword(user);

    const token = generateToken({
      id: user._id,
      email: user.email,
      mobileNo: user.mobileNo,
      role: user.role,
    });

    return res.status(200).json({
      message: 'OTP verified successfully',
      data: userResponse,
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

    const user = await User.findOne({
      $or: [{ email: data.email }, { mobileNo: data.mobileNo }],
    });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await verifyPassword(data.password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const userResponse = hidePassword(user);

    const token = generateToken({
      id: user._id,
      email: user.email,
      mobileNo: user.mobileNo,
      role: user.role,
    });

    return res
      .status(200)
      .json({ message: 'Login successfully', data: userResponse, token });
  } catch (error) {
    console.log('sign in error: ', error);
    return res.status(500).json({ message: 'Internal server error', error: error });
  }
};
