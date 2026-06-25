export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const generateId = (length = 12): string =>
  Array.from({ length }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))).join('');

export const sanitizeUser = (user: any) => {
  if (!user) return null;
  const { password, ...rest } = user.toObject ? user.toObject() : user;
  return rest;
};
