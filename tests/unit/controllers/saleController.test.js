const sinon = require('sinon');
const { expect } = require('chai');
const service = require('../../../services/saleService');
const controller = require('../../../controllers/saleController');
const { salesMockCC } = require('../mocks/saleMock');

describe('Realizando teste da camada Controller de vendas', () => {
  describe('Testando a função addSale', () => {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(service, 'addSale')
        .resolves({ code: 201, sold: { id: 3, itemsSold: [{ productId: 2, quantity: 3 }] } })
    });

    afterEach(() => sinon.restore());

    it('Verifica se ao inserir as informações certas, o código de resposta é 201', async () => {
      req.body = [{ productId: 2, quantity: 3 }];
      
      await controller.addSale(req, res);
      
      expect(res.status.calledWith(201)).to.be.true;
    });
  });

  describe('Testando a função getAll', () => {
    const res = {};
    const req = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon.stub(service, 'getAll').resolves({ code: 200, sales: salesMockCC });
    });

    afterEach(() => sinon.restore());

    it('Verifica se é retornado o código de resposta 200', async () => {
      await controller.getAll(req, res);
      
      expect(res.status.calledWith(200)).to.be.true;
    });

    it('Verificar se é retornado o array de vendas', async () => {
      await controller.getAll(req, res);
      
      expect(res.json.calledWith(salesMockCC)).to.be.true;
    });
  });
});
