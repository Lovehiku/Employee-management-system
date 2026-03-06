const express = require('express');
const router = express.Router();
const {createEmployee ,getEmployees  , getEmployee ,deleteEmployee}= require('../controllers/employeeControllers.js');


router.post('/employees', createEmployee);
router.get('/employees', getEmployees);
router.get('/employees/:id', getEmployee);
router.delete('/employees/:id', deleteEmployee);    

module.exports = router;