const express = require('express');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db');

const app = express();

// connects to database
connectDB();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use('/api/result', require('./routes/result'));


if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT);