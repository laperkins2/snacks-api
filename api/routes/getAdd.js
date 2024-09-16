const supabase = require('../../supaInstance');

const getAdd = async (req, res, next) => {
  try {
    const { name, description, price, category, instock } = req.body;
    if (!name || !description || !price || !category || !instock) {
      return res
        .status(400)
        .json({ message: 'Please provide all required fields' });
    }
    const newSnack = {
      name,
      description,
      price,
      category,
      instock,
    };
    const response = await supabase.post('/snacks', newSnack);

    res.status(201).json(newSnack);
  } catch (error) {
    next(error);
  }
};

module.exports = getAdd;
