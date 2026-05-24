import { User } from '../models/user.js';
import { updateUserSchema } from '../schemas/user.js';
import {
  deleteUserService,
  getAllUsersService,
  getUserService,
  updateUserService,
} from '../services/user/index.js';
import { paramSchema } from '../schemas/params.js';

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

export const getUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await getUserService(userId);

    if (!result) {
      return res.status(result.status).json({
        message: result.message,
      });
    }

    return res.status(result.status).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.log('get user error: ', error);
    return res.status(500).json({ message: 'Internal server error', error: error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { data, success, error } = updateUserSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ message: 'Invalid request', error: error });
    }

    const userId = req.user.id;

    const result = await updateUserService(data, userId);

    if (!result) {
      return res.status(result.status).json({
        message: result.message,
      });
    }

    return res.status(result.status).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.log('Update user error: ', error);
    return res.status(500).json({ message: 'Internal server error', error: error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await deleteUserService(userId);

    if (!result) {
      return res.status(result.status).json({
        message: result.message,
      });
    }

    return res.status(result.status).json({
      message: result.message,
    });
  } catch (error) {
    console.log('delete account error: ', error);
    return res.status(500).json({ message: 'Internal server error', error: error });
  }
};
