import { registerSchema } from '../schemas/user.js';
import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/token.js';

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

    const userResponse = user.toObject();
    delete userResponse.password;

    const token = generateToken({
      id: user.id,
      email: user.email,
      mobileNo: user.mobileNo,
      role: user.role,
    });

    return res
      .status(201)
      .json({ message: 'User register successfully', data: userResponse, token });
  } catch (error) {
    console.log('sign up error: ', error);
    return res.status(500).json({ message: 'Internal server error', error: error });
  }
};
