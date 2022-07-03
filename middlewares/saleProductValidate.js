const service = require('../services/productService');

const fieldsValidation = (products) => {
  const idFilled = products.every(({ productId }) => productId);
  if (!idFilled) return { code: 400, message: '"productId" is required' };

  const quantFilled = products.every(({ quantity }) => quantity || quantity === 0);
  if (!quantFilled) return { code: 400, message: '"quantity" is required' };

  const quantValid = products.every(({ quantity }) => quantity > 0);
  if (!quantValid) return { code: 422, message: '"quantity" must be greater than or equal to 1' };

  return {};
};

const productValidation = async (productList) => {
  const { products } = await service.getAll();

  const prods = productList.filter(({ productId }) => products
    .find(({ id }) => id === productId));
  
  if (prods.length === 0 || prods.length !== productList.length) {
    return false;
  }

  return true;
};

const idValidation = async (req, res, next) => {
  const { body } = req;
  const { code, message } = fieldsValidation(body);
  
  if (message) {
    return res.status(code).json({ message });
  }

  const validProd = await productValidation(body);

  if (!validProd) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

module.exports = idValidation;
