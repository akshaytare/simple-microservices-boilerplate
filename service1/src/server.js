const express = require('express');
const bodyParser = require('body-parser');
const KafkaProducer = require('./KafkaProducer');

const app = express();
const port = 3000;

// Configure body-parser middleware to parse request bodies
app.use(bodyParser.json());

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Initialize Kafka Producer
const producer = new KafkaProducer();

// API endpoint to send a message
app.post('/send', async (req, res) => {
  try {
    const message = req.body.message;
    // Produce the message to Kafka
    await producer.sendMessage(message);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Service 1 listening at http://localhost:${port}`);
});
