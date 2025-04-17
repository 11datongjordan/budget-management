const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');

router.post('/', async (req, res) => {
  const { message } = req.body;

  const ollama = spawn('ollama', ['run', 'llama3', message]);

  let response = '';

  ollama.stdout.on('data', (data) => {
    response += data.toString();
  });

  ollama.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  ollama.on('close', (code) => {
    res.json({ response: response.trim() });
  });
});

module.exports = router;
