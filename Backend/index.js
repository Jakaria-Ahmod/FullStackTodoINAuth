require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
// const TodosRoutes = require('./routes/api/Todos');
const route = require('./routes');
const DBCONNECT = require('./config/databaseConnect');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5050;
const morgan = require('morgan');

// midleware
app.use(
  cors({
    origin: 'http://localhost:5173', // / মুছে দাও
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(route);
app.use('/uploads', express.static('uploads'));
// app.use(TodosRoutes);

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
