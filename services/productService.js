const model = require('../models/productModel');

const productService = {
  getAll: async () => {
    const products = await model.getAll();
    const productList = products.sort((a, b) => a.id - b.id);
    
    return { code: 200, products: productList };
  },
  findById: async (id) => {
    const product = await model.findById(id);

    if (product.length === 0) {
      return { code: 404, message: 'Product not found' };
    }

    return { code: 200, product: product[0] };
  },
};

module.exports = productService;
