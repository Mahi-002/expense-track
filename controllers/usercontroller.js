const userModel = require('../models/userModel');
const bcrypt = require('bcrypt'); // Import bcrypt for password comparison

// Register a new user
const registerUser = (req, res) => {
    const { name, email, password } = req.body;

    userModel.addUser(name, email, password, (err) => {
        if (err) {
            if (err.message === 'Email already in use') {
                return res.status(400).send('Email is already registered'); // Handle duplicate email
            }
            console.error('Error adding user:', err);
            return res.status(500).send('Error adding user to the database');
        }
        res.redirect('/login');
    });
};

// Login a user
const loginUser = (req, res) => {
    const { email, password } = req.body;

    userModel.findUserByEmail(email, (err, user) => {
        if (err) {
            console.error('Error finding user:', err);
            return res.status(500).send('Error finding user');
        }

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Compare the entered password with the stored hashed password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).send('Error comparing passwords');
            }

            if (isMatch) {
                return res.redirect('./expense')
            } else {
                return res.status(401).send('Incorrect password');
            }
        });
    });
};

module.exports = {
    registerUser,
    loginUser
};
