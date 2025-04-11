const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'FieldProject';
const COLLECTION_NAME = 'loginInfo';

app.use(cors());
app.use(bodyParser.json());

// Mongo connection
let db;
MongoClient.connect(MONGO_URL, { useUnifiedTopology: true })
  .then(client => {
    db = client.db(DB_NAME);
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

// Signup Route
app.post('/signup', async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const existingUser = await db.collection(COLLECTION_NAME).findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    await db.collection(COLLECTION_NAME).insertOne({ email, username, password });
    res.status(200).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const user = await db.collection(COLLECTION_NAME).findOne({ email, username, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email, username, or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
