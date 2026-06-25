export const validateRegister = (body: any): string[] => {
  const errors: string[] = [];
  if (!body.name || typeof body.name !== 'string') errors.push('Name is required');
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.push('Valid email is required');
  if (!body.password || body.password.length < 6) errors.push('Password must be at least 6 characters');
  return errors;
};
export const validateLogin = (body: any): string[] => {
  const errors: string[] = [];
  if (!body.email) errors.push('Email is required');
  if (!body.password) errors.push('Password is required');
  return errors;
};
