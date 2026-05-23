import { registerSchema } from '../schemas/user.js';
import { User } from '../models/user.js';
import { Otp } from '../models/otp.js';
import bcrypt from 'bcryptjs';

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
