const { errorCodes, roles } = require("../constants");

const isAdmin = (req, res, next) => {
  const role = req.user.role;
  if (role && role === roles.ADMIN) next();
  else
    res.status(403).json({
      errorCode: errorCodes.NOT_ADMIN,
      message: "User is not an ADMIN",
    });
};

const isEmployee = (req, res, next) => {
  const role = req.user.role;
  if (role && (role === roles.ADMIN || role === roles.EMPLOYEE)) next();
  else
    res.status(403).json({
      errorCode: errorCodes.NOT_EMPLOYEE,
      message: "User is not an EMPLOYEE",
    });
};

const isEmployeeAuthorized = (req, res, next) => {
  const id = req.params.userId || req.body.userId;
  if (req.user.role === roles.ADMIN || id === req.user.id) next();
  else
    res.status(403).json({
      errorCode: errorCodes.NOT_AUTHORIZED,
      message: "User is not an auhtorized for this operation",
    });
};

module.exports = { isAdmin, isEmployee, isEmployeeAuthorized };