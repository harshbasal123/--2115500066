const express = require('express');
const axios = require('axios');
const app = express();

const WINDOW_SIZE = 10;
const THIRD_PARTY_SERVER_URL = 'http://localhost:9876/numbers/e'; 
const TIMEOUT = 500; // 500ms timeout

let numbers = [];

app.get('/:id', async (req, res) => {
  const id = req.params.id;
  if (!['p', 'f', 'e', 'r'].includes(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    const response = await axios.get(`${THIRD_PARTY_SERVER_URL}/${id}`, { timeout: TIMEOUT });
    const newNumbers = response.data.numbers;
    numbers = [...new Set([...numbers,...newNumbers])]; // remove duplicates
    numbers = numbers.slice(-WINDOW_SIZE); // limit to window size

    const windowPrevState = numbers.slice(0, -1);
    const windowCurrState = numbers;
    const avg = numbers.reduce((a, b) => a + b, 0) / numbers.length;

    res.json({
      windowPrevState,
      windowCurrState,
      numbers: newNumbers,
      avg: avg.toFixed(2),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching numbers' });
  }
});

app.listen(9876, () => {
  console.log('Server listening on port 9876');
});