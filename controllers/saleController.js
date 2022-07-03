const service = require('../services/saleService');

const saleController = {
  addSale: async (req, res) => {
    const { body } = req;
    const { code, sold } = await service.addSale(body);

    res.status(code).json(sold);
  },
};

module.exports = saleController;
