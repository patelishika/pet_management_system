export const hashPassword = async (password) => {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
};

export const verifyPassword = async (password, hashedPassword) => {
  const verifyPassword = await bcrypt.compare(password, hashedPassword);
  return verifyPassword;
};

export const hidePassword = (user) => {
  const userResponse = user.toObject();
  delete userResponse.password;
  return userResponse;
};
