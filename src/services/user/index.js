import {
  findAndDeleteAccount,
  deleteUserss,
  findAndUpdateUser,
  findUserById,
  findUserByPaginate,
} from '../../repositories/user/index.js';
import { hidePassword } from '../../utils/password.js';

export const getAllUsersService = async (page, limit, sortBy, order) => {
  const users = await findUserByPaginate(page, limit, sortBy, order);

  return {
    success: true,
    message: 'Users fetched successfully',
    status: 200,
    data: users,
  };
};

export const getUserService = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    return {
      success: false,
      message: 'User not found',
      status: 404,
    };
  }

  const userResponse = hidePassword(user);

  return {
    success: true,
    message: 'User fetched successfully',
    status: 200,
    data: userResponse,
  };
};

export const updateUserService = async (data, userId) => {
  const user = await findAndUpdateUser(data, userId);

  if (!user) {
    return {
      success: false,
      message: 'User not found',
      status: 404,
    };
  }

  const userResponse = hidePassword(user);
  return {
    success: true,
    message: 'Users updated successfully',
    status: 200,
    data: userResponse,
  };
};

export const deleteUserService = async (userId) => {
  const user = await findAndDeleteAccount(userId);

  if (!user) {
    return {
      success: false,
      message: 'User not found',
      status: 404,
    };
  }

  return {
    success: true,
    message: 'User deleted successfully',
    status: 200,
  };
};

export const deleteAllUsersService = async () => {
  const users = await deleteUserss();

  return {
    success: true,
    message: 'Users deleted successfully',
    status: 200,
  };
};
