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

//create an express application
const app = express();

//define a port
const PORT = 4000;

// define Middleware functions defined before routes
//use cors middleware
const corsOptions = {
  origin: 'http://localhost:4000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

//use JSON middleware to parse request bodies
app.use(express.json());

//define our routes
//Home Route
app.get('/', (req, res, next) => {
  res.json({ hello: 'World!' });
});

//Route to Get all Snacks
app.get('/snacks', getAll);

// Route to get a single snack
app.get('/snacks/:id', async (req, res, next) => {
  try {
    const response = await supabase.get(`/snacks?id=eq.${req.params.id}`);
    if (!response.data.length) {
      return res.status(404).json({ message: 'Snack not found!' });
    }
    res.json(response.data[0]);
  } catch (error) {
    next(error);
  }
});

//Route to add a new snack(post)
app.post('/snacks', async (req, res, next) => {
  try {
    const newSnack = req.body;
    if (
      newSnack.name &&
      newSnack.description &&
      newSnack.price &&
      newSnack.category &&
      newSnack.instock
    ) {
      const response = await supabase.post('/snacks', newSnack);
      res.status(200).json(response.data);
    } else {
      res.status(400).json({ message: 'Invalid data' });
    }
  } catch (error) {
    next(error);
  }
});

//Route to update existing snack(put)
app.put('/snacks/:id', async (req, res, next) => {
  try {
    const updatedSnack = req.body;
    if (
      updatedSnack.name &&
      updatedSnack.description &&
      updatedSnack.price &&
      updatedSnack.category &&
      updatedSnack.instock
    ) {
      const response = await supabase.patch(
        `/snacks?id=eq.${req.params.id}`,
        updatedSnack
      );

      res.status(200).json(response.data);
    } else {
      res.status(400).json({ message: 'Data Invalid' });
    }
  } catch (error) {
    next(error);
  }
});

//Route to delete a snack(delete)
app.delete('/snacks/:id', async (req, res, next) => {
  try {
    const response = await supabase.delete(`/snacks?id=eq.${req.params.id}`);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

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
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
