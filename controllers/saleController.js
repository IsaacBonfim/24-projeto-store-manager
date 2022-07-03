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
};

module.exports = saleController;
