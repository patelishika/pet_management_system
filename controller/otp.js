import { Otp } from '../models/otp.js';
import { User } from '../models/user.js';
import { otpSchema } from '../schemas/otp.js';
import { generateToken } from '../utils/token.js';

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
