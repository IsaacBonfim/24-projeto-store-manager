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
};

module.exports = saleService;
