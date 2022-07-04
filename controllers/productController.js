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
  addProduct: async (req, res) => {
    const { name } = req.body;
    const { code, message, product } = await service.addProduct({ name });
    
    if (message) {
      return res.status(code).json({ message });
    }
    
    res.status(code).json(product);
  },
  updateProduct: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const { code, message } = await service.updateProduct({ id, name });

    if (message) {
      return res.status(code).json({ message });
    }

    res.status(code).json({ id, name });
  },
  deleteProduct: async (req, res) => {
    const { id } = req.params;
    const { code, message } = await service.deleteProduct(id);

    if (message) {
      return res.status(code).json({ message });
    }

    res.status(code).end();
  },
};

module.exports = productController;
