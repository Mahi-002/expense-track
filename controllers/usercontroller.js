const userModel = require('../models/userModel');

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

module.exports = {
    renderHomePage,
    registerUser
};
