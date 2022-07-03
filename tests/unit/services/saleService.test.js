const sinon = require('sinon');
const { expect } = require('chai');
const model = require('../../../models/saleModel');
const service = require('../../../services/saleService');

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
});