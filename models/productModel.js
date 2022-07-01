const connection = require('./connection');

const productModel = {
  getAll: async () => {
    const query = 'SELECT * FROM StoreManager.products';
    const [products] = await connection.execute(query);

    return products;
  },
  findById: async (id) => {
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [product] = await connection.execute(query, [id]);
    
    return product;
  },
  addProduct: async ({ name }) => {
    const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [{ id }] = await connection.execute(query, [name]);

    return { id };
  },
};

module.exports = productModel;
