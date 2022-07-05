const model = require('../models/saleModel');

let idSale;

const addProduct = ({ productId, quantity }) => {
  model.soldProducts({ saleId: idSale, productId, quantity });

  return { productId, quantity };
};

const saleService = {
  addSale: async (products) => {
    idSale = await model.addSale();
    const itemsSold = products.map(addProduct);

    return { code: 201, sold: { id: idSale, itemsSold } };
  },
  getAll: async () => {
    const salesList = await model.getAll();
    const sales = salesList
      .map(({ date, product_id: productId, sale_id: saleId, quantity }) => ({
        date, saleId, productId, quantity,
      }));
    
    return { code: 200, sales };
  },
  findById: async (id) => {
    const salesList = await model.findById(id);

    if (salesList.length === 0) {
      return { code: 404, message: 'Sale not found' };
    }
    
    const sale = salesList
      .map(({ date, product_id: productId, quantity }) => ({
        date, productId, quantity,
      }));
    
    return { code: 200, sale };
  },
  deleteSale: async (id) => {
    const sale = await model.findById(id);

    if (sale.length === 0) {
      return { code: 404, message: 'Sale not found' };
    }

    await model.deleteSale(id);

    return { code: 204 };
  },
};

module.exports = saleService;
