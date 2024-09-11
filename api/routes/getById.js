const supabase = require('../../supaInstance');

const getById = async (req, res, next) => {
  try {
    const response = await supabase.get(`/snacks?id=eq.${req.params.id}`);
    if (!response.data.length) {
      return res.status(404).json({ message: 'Snack not found!' });
    }
    res.json(response.data[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
