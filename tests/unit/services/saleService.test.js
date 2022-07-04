const sinon = require('sinon');
const { expect } = require('chai');
const model = require('../../../models/saleModel');
const service = require('../../../services/saleService');
const { salesMockSC, salesMockCC, saleIdMockSC,
  saleIdMockCC } = require('../mocks/saleMock');

describe('Realizando teste da camada Service de vendas', () => {
  describe('Testando a função addSale', () => {
    beforeEach(() => {
      sinon.stub(model, 'addSale').returns({ saleId: 3 });
      sinon.stub(model, 'soldProducts').returns({ productId: 2, quantity: 2 });
    });
    
    afterEach(() => sinon.restore());

    it('Verifica se um objeto é retornado', async () => {
      const sale = await service.addSale([{ productId: 2, quantity: 2 }]);
      
      expect(sale).to.be.a('object');
    });

    it('Verifica se o código de resposta é 201', async () => {
      const sale = await service.addSale([ { productId: 2, quantity: 2 }]);
      
      expect(sale.code).to.be.equal(201);
    });

    it('Verifica se o retorno na chave sold é um objeto', async () => {
      const sale = await service.addSale([ { productId: 2, quantity: 2 }]);
      
      expect(sale.sold).to.be.a('object');
    });

    it('Verifica se é retornado corretamente o id e o produto vendido', async () => {
      const sale = await service.addSale([ { productId: 2, quantity: 2 }]);
      
      expect(sale.sold).to.be.deep
        .equal({ id: { saleId: 3 }, itemsSold: [{ productId: 2, quantity: 2 }]});
    });
  });

  describe('Testando a função getAll', () => {
    beforeEach(() => sinon.stub(model, 'getAll').resolves(salesMockSC));

    afterEach(() => sinon.restore());

    it('Verifica se um objeto é retornado', async () => {
      const sales = await service.getAll();

      expect(sales).to.be.a('object');
    });

    it('Verificar se o objeto retornado possui um código de resposta 200', async () => {
      const sales = await service.getAll();

      expect(sales.code).to.be.equal(200);
    });

    it('Verificar se o objeto retornado possui um array com as vendas', async () => {
      const salesList = await service.getAll();

      expect(salesList.sales).to.be.deep.equal(salesMockCC);
    });
  });

  describe('Testando a função findById', () => {
    beforeEach(() => sinon.stub(model, 'findById').resolves(saleIdMockSC));
    
    afterEach(() => sinon.restore());

    it('Verifica se um objeto é retornado', async () => {
      const sale = await service.findById(1);
    
      expect(sale).to.be.a('object');
    });

    it('Verifica se o objeto retornado possui um código de resposta 200', async () => {
      const sale = await service.findById(1);
    
      expect(sale.code).to.be.equal(200);
    });
    
    it('Verifica se o objeto retornado possui um array com as vendas', async () => {
      const salesList = await service.findById(1);
    
      expect(salesList.sale).to.be.deep.equal(saleIdMockCC);
    });
  });

  describe('Testando a função findById, caso uma Id inválida seja informada', () => {
    beforeEach(() => sinon.stub(model, 'findById').resolves([]));
    
    afterEach(() => sinon.restore());

    it('Verifica se um objeto é retornado', async () => {
      const sale = await service.findById(1);

      expect(sale).to.be.a('object');
    });

    it('Verifica se o objeto retornado possui um código de resposta 404', async () => {
      const sale = await service.findById(1);
      
      expect(sale.code).to.be.equal(404);
    });

    it('Verifica se o objeto retornado possui uma mensagem', async () => {
      const sale = await service.findById(1);
      
      expect(sale.message).to.be.equal('Sale not found');
    });
  });
});
