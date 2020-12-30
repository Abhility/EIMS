const router = require('express').Router();

const { isAdmin, isEmployee, isEmployeeAuthorized } = require('../middlewares/authorization');
const { verifyJWT } = require('../middlewares/jwt');
const { allFinances, allFinancesOfUser, addFinance, financeById, updateFinance } = require('../controller/finance.controller');

//Add finance information to DB for the employee
router.post('/users/:userId/finances', verifyJWT, isEmployee, isEmployeeAuthorized, addFinance);

//Update finance information in DB for the employee
router.put('/finances/:financeId', verifyJWT, isAdmin, updateFinance);

//Get all finances from DB (admin)
router.get('/finances', verifyJWT, isAdmin, allFinances);

//Get finances information for certain user 
router.get('/users/:userId/finances', verifyJWT, isEmployee, isEmployeeAuthorized, allFinancesOfUser);

//Get information of certain finance
router.get('/users/:userId/finances/:financeId', verifyJWT, isEmployee, isEmployeeAuthorized, financeById);

module.exports = router;