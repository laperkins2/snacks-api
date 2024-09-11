const supabase = require('../../supaInstance');

const getUpdate = async (req, res, next) => {
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
};

module.exports = getUpdate;
