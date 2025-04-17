const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Add a transaction
app.post('/transactions', async (req, res) => {
  const { description, amount, category, date } = req.body;
  try {
    const newTransaction = await pool.query(
      'INSERT INTO transactions (description, amount, category, date) VALUES ($1, $2, $3, $4) RETURNING *',
      [description, amount, category, date]
    );
    res.json(newTransaction.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all transactions
app.get('/transactions', async (req, res) => {
  try {
    const allTransactions = await pool.query('SELECT * FROM transactions ORDER BY date DESC');
    res.json(allTransactions.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
