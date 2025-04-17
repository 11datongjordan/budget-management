const pool = require('../db');

async function createTransaction({ description, amount, category, date }) {
  const result = await pool.query(
    `INSERT INTO transactions (description, amount, category, date)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [description, amount, category, date]
  );
  return result.rows[0];
}

module.exports = {
  createTransaction,
};
