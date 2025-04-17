const express = require('express');
const { Client } = require('pg');
const router = express.Router();
console.log("✅ Transactions route loaded");
router.get('/test', (req, res) => {
    res.send("✅ Test route works!");
  });
  

// 🔧 DB connection config (if not using .env, insert actual values)
const dbConfig = {
  connectionString: process.env.DATABASE_URL || 'postgres://username:password@localhost:5432/your_database_name',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

// ✅ POST - Add a new transaction
router.post('/add', async (req, res) => {
  const { amount, category, date, description } = req.body;

  const client = new Client(dbConfig);
  await client.connect();

  try {
    const result = await client.query(
      'INSERT INTO transactions(amount, category, date, description) VALUES($1, $2, $3, $4) RETURNING *',
      [amount, category, date, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding transaction:', err);
    res.status(500).json({ error: 'Failed to add transaction' });
  } finally {
    await client.end();
  }
});

// ✅ GET - Fetch all transactions
router.get('/', async (req, res) => {
  const client = new Client(dbConfig);
  await client.connect();

  try {
    const result = await client.query('SELECT * FROM transactions ORDER BY date DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching transactions:', err);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  } finally {
    await client.end();
  }
});

module.exports = router;
