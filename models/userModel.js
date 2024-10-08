const db = require('../database/db'); 

const getAllUsers = (callback) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};


const addUser = (name, email, password, callback) => {
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};
const findUserByEmail = (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results[0]); // Return the first user found
    });
};


module.exports = {
    getAllUsers,
    addUser,
    findUserByEmail
};
