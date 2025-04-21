const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');

router.post('/', async (req, res) => {
  const { message } = req.body;

  const ollama = spawn('ollama', ['run', 'llama3']);

  let response = '';

  // Collect response from Ollama
  ollama.stdout.on('data', (data) => {
    response += data.toString();
  });

  // Handle errors
  ollama.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  // Return result once process ends
  ollama.on('close', (code) => {
    res.json({ response: response.trim() });
  });

  // Send the message as input to Ollama
  ollama.stdin.write(message + '\n');
  ollama.stdin.end();
});

module.exports = router;
