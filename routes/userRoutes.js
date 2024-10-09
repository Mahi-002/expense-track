const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const path = require('path'); // Import the path module

// Route to render the signup page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Route to handle user registration
router.post('/register', userController.registerUser);

// Route to render the login page
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});
router.get('/expense', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/expense.html'));
});

// Route to handle user login
router.post('/login', userController.loginUser);

module.exports = router;
