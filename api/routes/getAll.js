const supabase = require('../../supaInstance');

const cache = {};

const getAll = async (req, res, next) => {
  try {
    //check if we have the data in our cache
    if (cache.snacks) {
      console.log('Using cache');
      return res.json(cache.snacks);
    }

    const response = await supabase.get('/snacks');
    //add the response data to our cache
    cache.snacks = response.data;
    console.log('Adding to cache');
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
