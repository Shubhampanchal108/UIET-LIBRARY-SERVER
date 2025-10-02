const express = require('express');
const env = require('dotenv').config();
const app = express();
const DB_Connection = require('./Configs/Database');

const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    


// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Library Management Server');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
    DB_Connection();
});
