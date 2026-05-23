import { loginSchema, registerSchema } from '../schemas/user.js';
import { User } from '../models/user.js';
import { Otp } from '../models/otp.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/token.js';
import { otpSchema } from '../schemas/otp.js';

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

    const isEmailExist = await User.findOne({ email: data.email });

    if (isEmailExist) {
      return res.status(409).json({ message: 'Email already exist' });
    }

    const isMobileNoExist = await User.findOne({ mobileNo: data.mobileNo });

    if (isMobileNoExist) {
      return res.status(409).json({ message: 'Mobile number already exist' });
    }

    data.password = await bcrypt.hash(data.password, 10);

    const user = await User.create(data);

    const generateOtp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpData = await Otp.create({
      validate: user.email || user.mobileNo,
      value: generateOtp,
    });

    return res.status(201).json({ message: 'User register successfully' });
  } catch (error) {
    console.log('sign up error: ', error);
    return res.status(500).json({ message: 'Internal server error', error: error });
  }
};

export const verifyOpt = async (req, res) => {
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

    const userResponse = user.toObject();
    delete userResponse.password;

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

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const userResponse = user.toObject();
    delete userResponse.password;

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
