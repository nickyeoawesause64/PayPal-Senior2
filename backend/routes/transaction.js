const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    const { details, transaction_amount, is_official } = req.body;
    const userId = req.user.id;
    try {
        const [result] = await db.execute('INSERT INTO transactions (user_id, details, transaction_amount, is_official) VALUES (?, ?, ?, ?)', 
        [userId, details, transaction_amount, is_official]);
        res.status(201).send('Transaction created');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.get('/', auth, async (req, res) => {
    const userId = req.user.id;
    try {
        const [rows] = await db.execute('SELECT * FROM transactions WHERE user_id = ?', [userId]);
        res.json(rows);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;

