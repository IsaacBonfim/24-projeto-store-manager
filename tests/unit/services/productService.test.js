const sinon = require('sinon');
const { expect } = require('chai');
const model = require('../../../models/productModel');
const service = require('../../../services/productService');
const mock = require('../mocks/productMock');

describe('Realizando teste da camada Service de produtos', () => {
  describe('Testando a função getAll', () => {
    beforeEach(() => sinon.stub(model, 'getAll').resolves(mock));

    afterEach(() => sinon.restore());

    it('Verifica se um objeto é retornado', async () => {
      const products = await service.getAll();

      expect(products).to.be.a('object');
    });

    it('Verifica se o objeto retornado possui um código de resposta e um array com os produtos', async () => {
      const products = await service.getAll();

      expect(products).to.be.deep.equal({ code: 200, products: mock });
    });

    it('Verifica se o código de resposta é igual a 200', async () => {
      const products = await service.getAll();

      expect(products.code).to.be.equal(200);
    });

    it('Verifica se o array de produtos está ordenado pelo campo Id', async () => {
      const array = await service.getAll();

      expect(array.products[0]).to.have.property('id', 1);
      expect(array.products[1]).to.have.property('id', 2);
      expect(array.products[2]).to.have.property('id', 3);
    });
  });

  describe('Testando a função findById', () => {
    beforeEach(() => sinon.stub(model, 'findById').resolves([mock[0]]));

    afterEach(() => sinon.restore());

    it('Verifica se um objeto é retornado', async () => {
      const product = await service.findById(1);
      
      expect(product).to.be.a('object');
    });

    it('Verifica se o código de resposta é igual a 200', async () => {
      const product = await service.findById(1);
      
      expect(product.code).to.be.equal(200);
    });

    it('Verifica se o objeto retornado contem o produto correto', async () => {
      const object = await service.findById(1);
      
      expect(object.product).to.be.deep.equal(mock[0]);
    });
  });

  describe('Testando a função findById, caso o produto buscado não exista', () => {
    beforeEach(() => sinon.stub(model, 'findById').resolves([]));

    afterEach(() => sinon.restore());

    it('Verifica se um objeto é retornado', async () => {
      const product = await service.findById(99);
      
      expect(product).to.be.a('object');
    });

    it('Verifica se o código de resposta é igual a 404', async () => {
      const product = await service.findById(99);
      
      expect(product.code).to.be.equal(404);
    });

    it('Verifica se é retornado uma mensagem informando que o produto não foi encontrado', async () => {
      const product = await service.findById(99);

      expect(product.message).to.be.equal('Product not found');
    });
  });

  describe('Testando a fução addProduct', () => {
    beforeEach(() => sinon.stub(model, 'addProduct').resolves({ id: 4 }));

    afterEach(() => sinon.restore());

    it('Verifica se um objeto é retornado', async () => {
      const product = await service.addProduct({ name: 'Armadura Mark II' });
      
      expect(product).to.be.a('object');
    });
    
    it('Verifica se o objeto retornado contem o código de resposta 201', async () => {
      const product = await service.addProduct({ name: 'Armadura Mark II' });

      expect(product.code).to.be.equal(201);
    });
    
    it('Verifica se é retonado o produto que foi inserido', async () => {
      const product = await service.addProduct({ name: 'Armadura Mark II' });

      expect(product.product).to.be.deep.equal({ id: 4, name: 'Armadura Mark II' });
    });
  });
});
