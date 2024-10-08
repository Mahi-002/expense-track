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
const loginUser = (req, res) => {
    const { email, password } = req.body;
    
    userModel.findUserByEmail(email, (err, user) => {
        if (err) {
            console.error('Error finding user:', err);
            return res.status(500).send('Error finding user');
        }
        
        if (!user) {
            return res.status(401).send('User not found');
        }

        // Compare the entered password with the hashed password in the database
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).send('Error comparing passwords');
            }

            if (result) {
                // Successful login
                res.send('Login successful!'); // Redirect or render a success page
            } else {
                // Incorrect password
                res.status(401).send('Incorrect password');
            }
        });
    });
};

module.exports = {
    renderHomePage,
    registerUser,
    loginUser 
};
