const express = require('express');
const bodyParser = require('body-parser');
const Keycloak = require('keycloak-connect');
const KafkaProducer = require('./KafkaProducer');
const session = require('express-session');


const app = express();
const port = 3000;

// Configure body-parser middleware to parse request bodies
app.use(bodyParser.json());

//session
app.use(session({
  secret:'thisShouldBeLongAndSecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Update with the origin of your frontend application
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Add OPTIONS method
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Add this header if your frontend application sends credentials (cookies, authorization headers, etc.)

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});




// Initialize Keycloak
var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });

// Protect all routes with Keycloak middleware
app.use(keycloak.middleware());

// Initialize Kafka Producer
const producer = new KafkaProducer();

// Custom middleware to check authentication
const checkAuthentication = (req, res, next) => {
  console.log("checking auth", req.kauth)
  if (req.kauth.grant) {
    console.log(req.kauth);
    console.log("req.user", req.user);
    console.log("req.kauth", req.kauth);
     const username = req.kauth.grant.access_token.content.preferred_username;
console.log("username",username)
    // User is authenticated, proceed to the next middleware
    next();
  } else {
    // User is not authenticated, return an error response
    res.status(401).json({ message: 'Unauthorized' });
  }
};




// API endpoint to send a message
app.post('/send', keycloak.protect(),checkAuthentication, async (req, res) => {
  console.log('post /send')
  
  try {
    const message = req.body.message;
    console.log(message);
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
