const connection = require('./connection');

const productModel = {
  getAll: async () => {
    const query = 'SELECT * FROM StoreManager.products';
    const [products] = await connection.execute(query);
    return products;
  },
};

module.exports = productModel;
