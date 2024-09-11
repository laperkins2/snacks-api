const supabase = require('../../supaInstance');

const getDelete = async (req, res, next) => {
  try {
    const response = await supabase.delete(`/snacks?id=eq.${req.params.id}`);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = getDelete;
