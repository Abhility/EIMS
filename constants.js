module.exports = {
  errorCodes: {
    NOT_ADMIN: 1001,
    NOT_EMPLOYEE: 1002,
    NOT_AUTHORIZED: 1003,
    NO_AUTH_HEADER: 5001,
    INVALID_TOKEN: 5002,
    DB_ERROR: 2001,
    LEAVE_ALREADY_PROCESSED: 3001,
  },
  roles: {
    EMPLOYEE: 'EMPLOYEE',
    ADMIN: 'ADMIN',
  },
};
