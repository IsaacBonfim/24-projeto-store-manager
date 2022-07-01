const service = require('../services/productService');

const productController = {
  getAll: async (_req, res) => {
    const { code, products } = await service.getAll();

    res.status(code).json(products);
  },
  findById: async (req, res) => {
    const { id } = req.params;
    const { code, message, product } = await service.findById(id);

    if (message) {
      return res.status(code).json({ message });
    }
    
    res.status(code).json(product);
  },
};

module.exports = productController;
