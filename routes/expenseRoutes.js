const express = require('express');
const router = express.Router();
const db = require('../database/db'); // Database connection

// Fetch all expenses
router.get('/expenses', (req, res) => {
    const sql = 'SELECT * FROM expenses';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching expenses');
        }
        res.json(results); // Send expenses as JSON
    });
});

// Add a new expense
router.post('/expenses', (req, res) => {
    const { amount, description, category } = req.body;
    const sql = 'INSERT INTO expenses (amount, description, category) VALUES (?, ?, ?)';
    db.query(sql, [amount, description, category], (err, result) => {
        if (err) {
            return res.status(500).send('Error adding expense');
        }
        res.status(201).send('Expense added');
    });
});

// Delete an expense by ID
router.delete('/expenses/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM expenses WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send('Error deleting expense');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Expense not found');
        }
        res.status(200).send('Expense deleted');
    });
});

module.exports = router;
