const express = require('express');
const path = require('path'); // Import path module
const router = express.Router();
const userController = require('../controllers/usercontroller');

// Route to render the signup page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html')); // Correctly serve index.html
});

// Route to render the login page
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html')); // Serve the login.html
});

// Route to handle user registration form submission
router.post('/register', userController.registerUser);

// Route to handle user login form submission
router.post('/login', userController.loginUser); // Add this line for login handling

module.exports = router;
