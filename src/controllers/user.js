import { User } from '../models/user.js';
import { getAllUsersService } from '../services/user/index.js';

export const getAllUsers = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sortBy = req.query.sortBy || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1 || 1;

    const result = await getAllUsersService(page, limit, sortBy, order);

    return res.status(result.status).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.log('get all user error: ', error);
    return res.status(500).json({ message: 'Internal server error', error: error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    return res.status(200).json({
      message: 'User upadated successfully',
      data: user,
    });
  } catch (error) {
    console.log('Update user error: ', error);

    return res.status(500).json({ message: 'Internal server error', error: error });
  }
};
