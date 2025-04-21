const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const pool = require('../db');
require('dotenv').config();

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google SSO Login
router.post('/google', async (req, res) => {
  const { token } = req.body;

  try {
    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    // Only allow corporate emails
    if (!email.endsWith('@yourcompany.com')) {
      return res.status(403).json({ error: 'Unauthorized domain' });
    }

    // Check if user already exists
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    let user = userCheck.rows[0];

    // If not, insert them
    if (!user) {
      const newUser = await pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
      );
      user = newUser.rows[0];
    }

    // Optionally generate a JWT token for your app
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ message: 'SSO login successful', token, user });
  } catch (err) {
    console.error('SSO error:', err.message);
    res.status(500).json({ error: 'SSO login failed' });
  }
});

module.exports = router;
