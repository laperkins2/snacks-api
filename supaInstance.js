//import Dotenv
require('dotenv').config();

const axios = require('axios');

const instance = axios.create({
  baseURL: process.env.SUPABASE_URL + '/rest/v1',
  timeout: 10000,
  headers: {
    apikey: process.env.SUPABASE_KEY,
    Authorization: 'Bearer ' + process.env.SUPABASE_KEY,
    'Content-Type': 'application/json',
  },
});

module.exports = instance;
