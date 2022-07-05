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
  updateSale: async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const { code, update, message } = await service.updateSale(id, body);

    if (message) {
      return res.statu(code).json({ message });
    }

    res.status(code).json(update);
  },
  deleteSale: async (req, res) => {
    const { id } = req.params;
    const { code, message } = await service.deleteSale(id);

    if (message) {
      return res.status(code).json({ message });
    }

    res.status(code).end();
  },
};

module.exports = saleController;
