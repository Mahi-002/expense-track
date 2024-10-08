const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
// Controller to handle rendering the index page
const renderHomePage = (req, res) => {
    userModel.getAllUsers((err, users) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).send('Error fetching users from the database');
        }
        res.render('index', { users });
    });
};

const registerUser = (req, res) => {
    const { name, email, password } = req.body;
    userModel.addUser(name, email, password, (err) => {
        if (err) {
            console.error('Error adding user:', err);
            return res.status(500).send('Error adding user to the database');
        }
        res.redirect('/');
    });
};
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

        if (user.password === password) {
            return res.send('User login successful!');
        } else {
            return res.status(401).send('User not authorized');
        }
    });
};


module.exports = {
    renderHomePage,
    registerUser,
    loginUser 
};
