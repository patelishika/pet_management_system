import jwt from 'jsonwebtoken';
import { verifyToken } from '../utils/token.js';

export const protect = (role = 'USER') => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    // console.log(authHeader)

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(401).json({ message: 'auth header Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    const decodeToken = verifyToken(token);

    if (!decodeToken.success) {
      return res.status(401).json({ message: 'decode Unauthorized' });
    }

    req.user = decodeToken.payload;

    if (req.user.role !== 'SUPER_ADMIN' && req.user.role !== role) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
  };
};
