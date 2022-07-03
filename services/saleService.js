const model = require('../models/saleModel');

let idSale;

const addProduct = ({ productId, quantity }) => {
  model.soldProducts({ idSale, productId, quantity });

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
      .map(({ date, product_Id: productId, sale_id: saleId, quantity }) => ({
        date, saleId, productId, quantity,
      }));
    
    return { code: 200, sales };
  },
  findById: async (id) => {
    const saleFound = await model.findById(id);

    if (saleFound.length === 0) {
      return { code: 404, message: 'Sale not found' };
    }

    const sale = saleFound
      .map(({ date, product_Id: productId, quantity }) => ({
        date, productId, quantity,
      }));
    
    return { code: 200, sale };
  },
};

module.exports = saleService;
