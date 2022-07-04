const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const model = require('../../../models/saleModel');
const mock = require('../mocks/saleMock');

describe('Realizando teste da camada Model de vendas', () => {
  describe('Testando a função addSale', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').returns([{ insertId: 3 }]);
    });
    
    afterEach(() => sinon.restore());

    it('Verifica se o id retornado é o da compra cadastrada', async () => {
      const sale = await model.addSale();

      expect(sale).to.be.equal(3);
    });
  });

  describe('Testando a função soldProducts', () => {
    beforeEach(() => sinon.stub(connection, 'execute'));

    afterEach(() => sinon.restore());

    it('Verifica se é retornado a informação sobre o produto vendido', async () => {
      const sale = await model.soldProducts({ saleId: 1, productId: 2, quantity: 1 });

      expect(sale).to.be.deep.equal({ productId: 2, quantity: 1 });
    });
  });

  describe('Testando a função getAll', () => {
    beforeEach(() => sinon.stub(connection, 'execute').returns([mock]));

    afterEach(() => sinon.restore());

    it('Verifica se um array é retornado', async () => {
      const sales = await model.getAll();

      expect(sales).to.be.a('array');
    });

    it('Verifica se o array de compras é retornado corretamente', async () => {
      const sales = await model.getAll();
      
      expect(sales).to.be.deep.equal(mock);
    });
  });
});
