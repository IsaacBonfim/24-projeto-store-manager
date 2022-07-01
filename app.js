const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const controller = require('./controllers/productController');

const app = express();
app.use(bodyParser.json());

//! não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', rescue(controller.getAll));

app.post('/products', rescue(controller.addProduct));

app.get('/products/:id', rescue(controller.findById));

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
});

//! não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
