const express = require('express');
const router = express.Router();
const db = require('../database/db'); // Database connection

router.get('/expenses', (req, res) => {
    const userId = req.user.id; // Assuming user id is stored in the request
    const sql = 'SELECT * FROM expenses WHERE user_id = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching expenses');
        }
        res.json(results);
    });
});

// Add a new expense
router.post('/expenses', (req, res) => {
    const { amount, description, category } = req.body;
    const userId = req.user.id; // Assuming user id is stored in the request
    const sql = 'INSERT INTO expenses (amount, description, category, user_id) VALUES (?, ?, ?, ?)';
    db.query(sql, [amount, description, category, userId], (err, result) => {
        if (err) {
            return res.status(500).send('Error adding expense');
        }
        res.status(201).send('Expense added');
    });
});

// Delete an expense by ID
// Delete an expense only if it belongs to the logged-in user
router.delete('/expenses/:id', (req, res) => {
    const expenseId = req.params.id;
    const userId = req.user.id; // Assuming user id is stored in the request

    // Check if the expense belongs to the logged-in user
    const sql = 'DELETE FROM expenses WHERE id = ? AND user_id = ?';
    db.query(sql, [expenseId, userId], (err, result) => {
        if (err) {
            return res.status(500).send('Error deleting expense');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Expense not found or you do not have permission to delete it');
        }
        res.status(200).send('Expense deleted');
    });
});

module.exports = router;
