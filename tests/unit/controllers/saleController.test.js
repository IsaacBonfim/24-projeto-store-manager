const sinon = require('sinon');
const { expect } = require('chai');
const service = require('../../../services/saleService');
const controller = require('../../../controllers/saleController');

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
});
