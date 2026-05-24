import { Otp } from '../../models/otp.js';
import { User } from '../../models/user.js';

export const isEmailOrMoblieNoExist = async (email, mobileNo) => {
  const user = await User.findOne({
    $or: [{ email: email }, { mobileNo: mobileNo }],
  });
  return user;
};

export const createUser = async (data) => {
  const user = await User.create(data);
  return user;
};

export const createOtp = async (identifier, value) => {
  const otp = await Otp.create({ identifier, value });
  return otp;
};

export const isIdentifierExist = async (identifier) => {
  const otp = await Otp.findOne({
    identifier: identifier,
  });

  return otp;
};
