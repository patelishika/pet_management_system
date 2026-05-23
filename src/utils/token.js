import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

export const verifyToken = (token) => {
  try {
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
