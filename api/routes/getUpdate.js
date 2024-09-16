const supabase = require('../../supaInstance');

const getUpdate = async (req, res, next) => {
  try {
    const { name, description, price, category, instock } = req.body;
    if (!name || !description || !price || !category || !instock) {
      return res
        .status(400)
        .json({ message: 'Please provide all required fields' });
    }
    const updatedSnack = {
      name,
      description,
      price,
      category,
      instock,
    };
    const response = await supabase.patch(
      `/snacks?id=eq.${req.params.id}`,
      updatedSnack
    );
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

module.exports = getUpdate;
