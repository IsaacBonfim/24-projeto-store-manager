const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const model = require('../../../models/productModel');
const mock = require('../mocks/productMock');

describe('Realizando teste da camada Model de produtos', () => {
  describe('Testando a função getAll', () => {
    beforeEach(() => sinon.stub(connection, 'execute').resolves([mock]));

    afterEach(() => sinon.restore());

    it('Verifica se um array é retornado', async () => {
      const products = await model.getAll();

      expect(products).to.be.a('array');
    });

    it('Verifica se o array de produtos é retornado', async () => {
      const products = await model.getAll();

      expect(products).to.be.deep.equal(mock);
    });
  });

  describe('Testando a função findById', () => {
    beforeEach(() => sinon.stub(connection, 'execute').resolves([[mock[0]]]));

    afterEach(() => sinon.restore());

    it('Verifica se um array é retornado', async () => {
      const products = await model.findById(1);

      expect(products).to.be.a('array');
    });

    it('Verifica se o array retornado contem apenas um objeto do produto correto', async () => {
      const products = await model.findById(1);

      expect(products).to.be.deep.equal([mock[0]]);
    });
  });
  
  describe('Testando a função addProduct', () => {
    beforeEach(() => sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]));

    afterEach(() => sinon.restore());

    it('Verifica se retorna um objeto', async () => {
      const product = await model.addProduct({ name: 'Armadura Mark II' });
      
      expect(product).to.be.a('object');
    });

    it('Verifica se é retornado um objeto com a Id do novo produto', async () => {
      const product = await model.addProduct({ name: 'Armadura Mark II' });

      expect(product).to.be.deep.equal({ id: 4 });
    });
  });
});
