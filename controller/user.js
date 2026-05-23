import { User } from '../models/user.js';

export const getAllUsers = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sortBy = req.query.sortBy || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1 || 1;

    const users = await User.paginate(
      {},
      {
        page,
        limit,
        sort: {
          sortBy: order,
        },
        select: '-password',
      }
    );
    if (!users) {
      return res.status(404).json({ message: 'No users found' });
    }

    return res.status(200).json({
      message: 'Users fetched successfully',
      data: users,
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

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'User upadated successfully',
      data: user,
    });
  } catch (error) {
    console.log('Update user error: ', error);

    return res.status(500).json({ message: 'Internal server error', error: error });
  }
};
