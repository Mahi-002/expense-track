const db = require('../database/db');
const bcrypt = require('bcrypt'); // Import bcrypt for Blowfish encryption

// Fetch all users
const getAllUsers = (callback) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Find user by email
const findUserByEmail = (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results[0]); // Return the first user found
    });
};

// Add a new user with encrypted password
const addUser = (name, email, password, callback) => {
    // First, check if the user already exists by email
    findUserByEmail(email, (err, existingUser) => {
        if (err) return callback(err, null);
        if (existingUser) return callback(new Error('Email already in use'), null); // Prevent duplicate email signup

        // Hash the password using bcrypt (Blowfish)
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return callback(err, null);

            const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            db.query(sql, [name, email, hashedPassword], (err, result) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, result);
            });
        });
    });
};

module.exports = {
    getAllUsers,
    findUserByEmail,
    addUser
};
