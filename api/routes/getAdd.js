const supabase = require('../../supaInstance');

const getAdd = async (req, res, next) => {
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
};

module.exports = getAdd;
