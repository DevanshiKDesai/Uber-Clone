const userModel = require('../models/user.model.js');
const userService = require('../services/user.service.js');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { fullName, email, password } = req.body;
      const hashedPassword = await userModel.hashPassword(password);
  
      const user = await userService.createUser({
        fullName: {
          firstName: fullName.firstName,
          lastName: fullName.lastName
        },
        email,
        password: hashedPassword
      });
  
      const token = user.generateAuthTokens();  
      res.status(201).json({ token, user });
    } catch (error) {
      console.error("🔥 Error in registerUser:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  