const express = require('express');
const cors = require('cors');
require('dotenv').config();

const transactionsRoute = require('./routes/transactions');
console.log("✅ Loaded transactions route");

const chatRoute = require('./routes/chat');


const app = express();

app.use(cors());
app.use(express.json());
app.use('/chat', chatRoute);


app.use('/transactions', transactionsRoute);

const PORT = process.env.PORT || 5000;
app.use((req, res) => {
    res.status(404).send(`🔍 Route not found: ${req.originalUrl}`);
  });
  
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



