export const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const verifyPassword = async (password, hashedPassword) => {
  const verifiedPassword = await bcrypt.compare(password, hashedPassword);
  return verifiedPassword;
};

export const hidePassword = (user) => {
  const userResponse = user.toObject();
  delete userResponse.password;
  return userResponse;
};
