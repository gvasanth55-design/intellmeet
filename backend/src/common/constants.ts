export const HTTP_STATUS = {
  OK: 200, CREATED: 201, ACCEPTED: 202, NO_CONTENT: 204,
  BAD_REQUEST: 400, UNAUTHORIZED: 401, FORBIDDEN: 403,
  NOT_FOUND: 404, CONFLICT: 409, UNPROCESSABLE: 422,
  TOO_MANY: 429, INTERNAL: 500,
} as const;

export const MEETING_STATUS = { SCHEDULED: 'scheduled', LIVE: 'live', ENDED: 'ended', CANCELLED: 'cancelled' } as const;
export const USER_ROLES = { ADMIN: 'admin', USER: 'user', MODERATOR: 'moderator' } as const;
