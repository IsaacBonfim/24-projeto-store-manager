const service = require('../services/productService');

const productController = {
  getAll: async (_req, res) => {
    const { code, message, products } = await service.getAll();
    if (message) {
      return res.status(code).json({ message });
    }
    res.status(code).json(products);
  },
  findById: async (req, res) => {
    const { id } = req.params;
    const { code, message, products } = await service.findById(id);
    if (message) {
      return res.status(code).json({ message });
    }
    res.status(code).json(products);
  },
};

module.exports = productController;
