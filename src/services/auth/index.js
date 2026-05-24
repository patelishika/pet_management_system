import { Otp } from '../../models/otp.js';
import { User } from '../../models/user.js';
import {
  createOtp,
  createUser,
  isEmailOrMoblieNoExist,
  isIdentifierExist,
} from '../../repositories/auth/index.js';
import { generateOtp } from '../../utils/otp.js';
import { hashPassword } from '../../utils/password.js';

export const signUpService = async (data) => {
  const isUserExist = await isEmailOrMoblieNoExist(data.email, data.mobileNo);

  if (isUserExist) {
    return {
      success: false,
      message: 'User already exist',
      status: 400,
    };
  }

  const hashedPassword = await hashPassword(data.password);

  const user = await createUser({ ...data, password: hashedPassword });

  const otp = generateOtp();

  if (data.email) {
    await createOtp(data.email, otp);
  } else {
    await createOtp(data.mobileNo, otp);
  }

  return {
    success: true,
    message: 'User register Successfully',
    status: 201,
    data: user,
  };
};

export const verifyOtpService = async (data) => {
  const otpRecord = await isIdentifierExist(data.identifier);

  if (!otpRecord || otpRecord.value !== data.value) {
    return {
      success: false,
      message: 'Invalid otp',
      status: 400,
    };
  }

  const user = await isEmailOrMoblieNoExist(data.email, data.mobileNo);

  if (!user) {
    return {
      success: false,
      message: 'User not found',
      status: 400,
    };
  }

  const userResponse = hidePassword(user);

  return {
    success: true,
    message: 'Otp verified successfully',
    status: 200,
    data: userResponse,
  };
};
