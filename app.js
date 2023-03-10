const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const pController = require('./controllers/productController');
const sController = require('./controllers/saleController');
const idValidation = require('./middlewares/saleProductValidate');

const app = express();
app.use(bodyParser.json());

//! não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', rescue(pController.getAll));

app.post('/products', rescue(pController.addProduct));

app.get('/products/search', rescue(pController.search));

app.put('/products/:id', rescue(pController.updateProduct));

app.get('/products/:id', rescue(pController.findById));

app.delete('/products/:id', rescue(pController.deleteProduct));

app.get('/sales', rescue(sController.getAll));

app.post('/sales', rescue(idValidation), rescue(sController.addSale));

app.put('/sales/:id', rescue(idValidation), rescue(sController.updateSale));

app.get('/sales/:id', rescue(sController.findById));

app.delete('/sales/:id', rescue(sController.deleteSale));

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
});

//! não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
