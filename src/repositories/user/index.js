import { User } from '../../models/user.js';

export const findUserByPaginate = async (query) => {
  const users = await User.paginate(
    {},
    {
      page: query.page,
      limit: query.limit,
      sort: {
        [query.sortBy]: query.order,
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

export const findAndUpdateUser = async ({ data, userId }) => {
  const user = await User.findByIdAndUpdate(userId, data, {
    new: true,
  });

  return user;
};

export const findAndDeleteAccount = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  return user;
};

export const deleteUserss = async () => {
  const users = await User.deleteMany({});
  return users;
};
