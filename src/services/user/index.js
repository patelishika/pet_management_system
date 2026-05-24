import { userPaginate } from '../../repositories/user/index.js';

export const getAllUsersService = async (page, limit, sortBy, order) => {
  const users = await userPaginate(page, limit, sortBy, order);

  return {
    success: true,
    message: 'Users fetched successfully',
    status: 200,
    data: users,
  };
};
