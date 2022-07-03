const connection = require('./connection');

const saleModel = {
  addSale: async () => {
    const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
    const [{ insertId }] = await connection.execute(query);

    return insertId;
  },
};

module.exports = saleModel;
