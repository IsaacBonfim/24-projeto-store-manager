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
  addProduct: async ({ name }) => {
    if (!name) {
      return { code: 400, message: '"name" is required' };
    }

    if (name.length < 5) {
      return { code: 422, message: '"name" length must be at least 5 characters long' };
    }

    const { id } = await model.addProduct({ name });    
    
    return { code: 201, product: { id, name } };
  },
  updateProduct: async ({ id, name }) => {
    if (!name) {
      return { code: 400, message: '"name" is required' };
    }

    if (name.length < 5) {
      return { code: 422, message: '"name" length must be at least 5 characters long' };
    }

    const validProduct = await model.findById(id);

    if (validProduct.length === 0) {
      return { code: 404, message: 'Product not found' };
    }

    await model.updateProduct({ id, name });

    return { code: 200, id, name };
  },
  deleteProduct: async (id) => {
    const product = model.findById(id);

    if (product.length === 0) {
      return { code: 404, message: 'Product not found' };
    }

    await model.deleteProduct(id);

    return { code: 204 };
  },
};

module.exports = productService;
