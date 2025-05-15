export const hasAccess = (userRole, allowedRoles) => {
  return allowedRoles.includes(userRole);
};