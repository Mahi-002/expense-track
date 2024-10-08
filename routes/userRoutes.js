const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

// Route to render the home page and show registered users
router.get('/', userController.renderHomePage);

// Route to handle user registration form submission
router.post('/register', userController.registerUser);

module.exports = router;
