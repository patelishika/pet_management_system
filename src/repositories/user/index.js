import { User } from '../../models/user.js';

export const userPaginate = async (page, limit, sortBy, order) => {
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

  return users;
};

export const findUserById = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

export const findAndUpdateUser = async (data, userId) => {
  const user = await User.findByIdAndUpdate(userId, data, {
    new: true,
  });

  return user;
};

export const findAndDeleteAccount = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  return user;
};
