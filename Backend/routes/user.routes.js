const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller.js');

router.post('/register', [
    body('email'). isEmail().withMessage('Please enter a valid email address'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], userController.registerUser);


router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').notEmpty().isLength({min: 6}).withMessage('Password is required')
], userController.loginUser);

module.exports = router