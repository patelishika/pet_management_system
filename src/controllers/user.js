import { User } from '../models/user.js';
import { updateUserSchema } from '../schemas/user.js';
import {
  deleteAllUsersService,
  deleteUserService,
  getAllUsersService,
  getUserService,
  updateUserService,
} from '../services/user/index.js';
import { paramSchema } from '../schemas/params.js';

export const getAllUsers = async (req, res) => {
  try {
    const result = await getAllUsersService({
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      sortBy: req.query.sortBy || 'createdAt',
      order: req.query.order === 'asc' ? 1 : -1 || 1,
    });

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
    const result = await getUserService({ userId: req.user.id });

    if (!result.success) {
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

    const result = await updateUserService({ data, userId: req.user.id });

    if (!result.success) {
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
    const result = await deleteUserService({ userId: req.user.id });

    if (!result.success) {
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

export const deleteAllUsers = async (req, res) => {
  try {
    const result = await deleteAllUsersService();

    return res.status(result.status).json({
      message: result.message,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
