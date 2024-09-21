//import Dotenv
require('dotenv').config();

// import Express
const express = require('express');

//import cors
const cors = require('cors');

//import Axios
const axios = require('axios');

//import our Supabase instance
const supabase = require('../supaInstance');

//import route functions
const getAll = require('./routes/getAll');
const getById = require('./routes/getById');
const getAdd = require('./routes/getAdd');
const getUpdate = require('./routes/getUpdate');
const getDelete = require('./routes/getDelete');
const docs = require('./routes/docs');

//create an express application
const app = express();

//define a port
const PORT = 4000;

// define Middleware functions defined before routes
//use cors middleware
const corsOptions = {
  origin: process.env.SNACKS_CLIENT,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//use JSON middleware to parse request bodies
app.use(express.json());

//middleware for api key security

app.use((req, res, next) => {
  const apiKey = req.headers['api-key'];

  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  next();
});

//define our routes
//Home Route
app.get('/', (req, res, next) => {
  res.json(docs);
});

//Route to Get all Snacks
app.get('/snacks', getAll);

// Route to get a single snack
app.get('/snacks/:id', getById);

//Route to add a new snack(post)
app.post('/snacks', getAdd);

//Route to update existing snack(put)
app.put('/snacks/:id', getUpdate);

//Route to delete a snack(delete)
app.delete('/snacks/:id', getDelete);

//error handling
//generic error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({
    error: 'Something is not right!',
    errorStack: error.stack,
    errorMessage: error.message,
  });
});

//404 Resource not found Error Handling
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Resource not found.',
  });
});

//make the server listen on our port
const server = app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});

module.exports = { app, server };
