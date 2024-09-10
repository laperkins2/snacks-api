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

//create an express application
const app = express();

//define a port
const PORT = 4000;

const SNACKS = [
  {
    id: 1,
    name: 'Chips',
    description: 'Crunchy and salty potato chips.',
    price: 2.99,
    category: 'Salty Snacks',
    inStock: true,
  },
  {
    id: 2,
    name: 'Chocolate Bar',
    description: 'Rich and creamy milk chocolate bar.',
    price: 1.49,
    category: 'Sweet Snacks',
    inStock: true,
  },
  {
    id: 3,
    name: 'Popcorn',
    description: 'Buttery and fluffy popcorn.',
    price: 3.49,
    category: 'Salty Snacks',
    inStock: false,
  },
  {
    id: 4,
    name: 'Gummy Bears',
    description: 'Colorful and chewy gummy bears.',
    price: 2.19,
    category: 'Sweet Snacks',
    inStock: true,
  },
  {
    id: 5,
    name: 'Pretzels',
    description: 'Crispy and twisted pretzels.',
    price: 2.79,
    category: 'Salty Snacks',
    inStock: true,
  },
  {
    id: 6,
    name: 'Granola Bar',
    description: 'Healthy and crunchy granola bar.',
    price: 1.99,
    category: 'Healthy Snacks',
    inStock: true,
  },
  {
    id: 7,
    name: 'Fruit Snacks',
    description: 'Sweet and fruity gummy snacks.',
    price: 2.49,
    category: 'Sweet Snacks',
    inStock: false,
  },
  {
    id: 8,
    name: 'Nuts Mix',
    description: 'A mix of roasted and salted nuts.',
    price: 4.99,
    category: 'Healthy Snacks',
    inStock: true,
  },
  {
    id: 9,
    name: 'Energy Bar',
    description: 'High-protein energy bar.',
    price: 2.59,
    category: 'Healthy Snacks',
    inStock: true,
  },
  {
    id: 10,
    name: 'Rice Crackers',
    description: 'Light and crispy rice crackers.',
    price: 3.19,
    category: 'Healthy Snacks',
    inStock: false,
  },
];

// define Middleware functions defined before routes
//use cors middleware
app.use(cors());

//use JSON middleware to parse request bodies
app.use(express.json());

//define our routes
//Home Route
app.get('/', (req, res, next) => {
  res.json({ hello: 'World!' });
});

//Route to Get all Snacks
app.get('/snacks', async (req, res, next) => {
  try {
    // res.json(SNACKS);
    const response = await supabase.get('/snacks');
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

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
