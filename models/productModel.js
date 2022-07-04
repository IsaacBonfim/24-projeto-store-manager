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
    const query = 'INSERT INTO StoreManager.products (name) VALUES (?);';
    const [{ insertId }] = await connection.execute(query, [name]);

    return { id: insertId };
  },
  updateProduct: async ({ id, name }) => {
    const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
    
    await connection.execute(query, [name, id]);

    return true;
  },
  deleteProduct: async (id) => {
    const query = 'DELETE FROM StoreManager.products WHERE id = ?;';

    await connection.execute(query, [id]);

    return true;
  },
};

module.exports = productModel;
