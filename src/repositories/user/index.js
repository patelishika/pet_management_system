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
