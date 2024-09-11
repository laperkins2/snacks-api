const supabase = require('../../supaInstance');

const getAll = async (req, res, next) => {
  try {
    // res.json(SNACKS);
    const response = await supabase.get('/snacks');
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
