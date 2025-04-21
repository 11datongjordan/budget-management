const express = require('express');
const cors = require('cors');
require('dotenv').config();

const transactionsRoute = require('./routes/transactions');
const chatRoute = require('./routes/chat');
const authRoute = require('./routes/auth'); // ✅ Add this line

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/transactions', transactionsRoute);
app.use('/chat', chatRoute);
app.use('/auth', authRoute); // ✅ Mount auth routes at /auth

// 404 handler
app.use((req, res) => {
  res.status(404).send(`🔍 Route not found: ${req.originalUrl}`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
