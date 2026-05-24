import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    console.log('JWT_SECRET not found');
    return null;
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

export const verifyToken = (token) => {
  try {
    if (!process.env.JWT_SECRET) {
      console.log('JWT_SECRET not found');

      return {
        success: false,
        payload: {},
      };
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return {
      success: true,
      payload,
    };
  } catch (error) {
    return {
      success: false,
      payload: {},
    };
  }
};
