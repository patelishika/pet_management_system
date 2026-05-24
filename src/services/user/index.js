import { findAndUpdateUser, userPaginate } from '../../repositories/user/index.js';
import { hidePassword } from '../../utils/password.js';

export const getAllUsersService = async (page, limit, sortBy, order) => {
  const users = await userPaginate(page, limit, sortBy, order);

  return {
    success: true,
    message: 'Users fetched successfully',
    status: 200,
    data: users,
  };
};

export const updateUserService = async (data, userId) => {
  const user = await findAndUpdateUser(data, userId);

  const userResponse = hidePassword(user);
  return {
    success: true,
    message: 'Users updated successfully',
    status: 200,
    data: userResponse,
  };
};
