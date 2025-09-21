require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
// const TodosRoutes = require('./routes/api/Todos');
const route = require('./routes');
const DBCONNECT = require('./config/databaseConnect');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5050;
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const morgan = require('morgan');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend API Documentation',
      version: '1.0.0',
      description: 'API documentation using Swagger for Backend Project',
    },
    servers: [
      {
        url: 'http://localhost:8080/api/v1', // তোমার সার্ভারের base URL
      },
    ],
  },
  apis: ['./routes/api/*.js'], // Route ফাইল গুলোতে JSDoc comments খুঁজবে
};

const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

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

// app listen
app.listen(PORT, () => {
  DBCONNECT();
  console.log(`server is Ruing at http://127.0.0.1:${PORT}`);
});
