require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const route = require('./routes');
const DBCONNECT = require('./config/databaseConnect');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5050;

// midleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(route);

// invalid route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'invalid routes pliese check your correct routes',
  });
});

// app listen
app.listen(PORT, () => {
  DBCONNECT();
  console.log(`server is Ruing at http://127.0.0.1:${PORT}`);
});
