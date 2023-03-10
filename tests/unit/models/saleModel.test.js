const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const model = require('../../../models/saleModel');
const { salesMockSC } = require('../mocks/saleMock');

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
    beforeEach(() => sinon.stub(connection, 'execute').returns([salesMockSC]));

    afterEach(() => sinon.restore());

    it('Verifica se um array é retornado', async () => {
      const sales = await model.getAll();

      expect(sales).to.be.a('array');
    });

    it('Verifica se o array de compras é retornado corretamente', async () => {
      const sales = await model.getAll();
      
      expect(sales).to.be.deep.equal(salesMockSC);
    });
  });

  describe('Testando a função findById', () => {
    beforeEach(() => sinon.stub(connection, 'execute').returns([[salesMockSC[0]]]));

    afterEach(() => sinon.restore());

    it('Verifica se um array é retornado', async () => {
      const sales = await model.findById();
    
      expect(sales).to.be.a('array');
    });

    it('Verifica se o array de compras é retornado corretamente', async () => {
      const sales = await model.findById();
    
      expect(sales[0]).to.be.deep.equal(salesMockSC[0]);
    });
  });

  describe('Testando a função deleteSale', () => {
    beforeEach(() => sinon.stub(connection, 'execute').resolves());

    afterEach(() => sinon.restore());

    it('Verifica se o retorno é booleano', async () => {
      const sale = await model.deleteSale(1);
      
      expect(sale).to.be.a('boolean');
    });

    it('Verifica se ao deletar uma venda retorna "true"', async () => {
      const sale = await model.deleteSale(1);
      
      expect(sale).to.be.equal(true);
    });
  });

  describe('Testando a função updateSale', () => {
    beforeEach(() => sinon.stub(connection, 'execute').resolves());

    afterEach(() => sinon.restore());

    it('Verifica se é retornado um objeto', async () => {
      const sale = await model.updateSale({ id: 1, productId: 1, quantity: 1 });
      
      expect(sale).to.be.a('object');
    });

    it('Verifica se o objeto retornado contem a Id do produto e sua quantidade', async () => {
      const sale = await model.updateSale({ id: 1, productId: 1, quantity: 1 });
      
      expect(sale).to.be.deep.equal({ productId: 1, quantity: 1 });
    });
  });
});
