const service = require('../services/saleService');

const saleController = {
  addSale: async (req, res) => {
    const { body } = req;
    const { code, sold } = await service.addSale(body);

    res.status(code).json(sold);
  },
  getAll: async (_req, res) => {
    const { code, sales } = await service.getAll();
    
    res.status(code).json(sales);
  },
  findById: async (req, res) => {
    const { id } = req.params;
    const { code, message, sale } = await service.findById(id);
    
    if (message) {
      return res.status(code).json({ message });
    }
    
    res.status(code).json(sale);
  },
};

module.exports = saleController;
