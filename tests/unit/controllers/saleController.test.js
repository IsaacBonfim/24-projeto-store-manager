const sinon = require('sinon');
const { expect } = require('chai');
const service = require('../../../services/saleService');
const controller = require('../../../controllers/saleController');
const { salesMockCC, saleIdMockCC } = require('../mocks/saleMock');

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

    it('Verifica se é retornado o array de vendas', async () => {
      await controller.getAll(req, res);
      
      expect(res.json.calledWith(salesMockCC)).to.be.true;
    });
  });

  describe('Testando a função findById', () => {
    const res = {};
    const req = {};

    beforeEach(() => {
      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(service, 'findById').resolves({ code: 200, sale: saleIdMockCC });
    });

    afterEach(() => sinon.restore());

    it('Verifica se é retornado o código de resposta 200', async () => {
      await controller.findById(req, res);
    
      expect(res.status.calledWith(200)).to.be.true;
    });

    it('Verifica se é retornado um array com as vendas', async () => {
      await controller.findById(req, res);
    
      expect(res.json.calledWith(saleIdMockCC)).to.be.true;
    });
  });

  describe('Testando a função findById, caso uma Id inválida seja informada', () => {
    const req = {};
    const res = {};

    beforeEach(() => {
      req.params = { id: 99 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(service, 'findById').resolves({ code: 404, message: 'Sale not found' });
    });

    afterEach(() => sinon.restore());

    it('Verifica se é retornado o código de resposta 404', async () => {
      await controller.findById(req, res);
      
      expect(res.status.calledWith(404)).to.be.true;
    });

    it('Verifica se uma mensagem é retornada', async () => {
      await controller.findById(req, res);
    
      expect(res.json.calledWith({ message: 'Sale not found' })).to.be.true;
    });
  });

  describe('Testando a função deleteSale', () => {
    const req = {};
    const res = {};

    beforeEach(() => {
      req.params = { id: 1 };

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
      
      sinon.stub(service, 'deleteSale').resolves({ code: 204 });
      sinon.stub(service, 'findById').resolves([saleIdMockCC]);
    });

    afterEach(() => sinon.restore());

    it('Verifica se é retornado o código de resposta 204', async () => {
      await controller.deleteSale(req, res);
      
      expect(res.status.calledWith(204)).to.be.true;
    });
  });

  describe('Testando a função deleteSale, caso o Id informado seja inválido', () => {
    const req = {};
    const res = {};

    beforeEach(() => {
      req.params = { id: 99 };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(service, 'deleteSale')
        .resolves({ code: 404, message: 'Sale not found' });
    });
    
    afterEach(() => sinon.restore());
    
    it('Verifica se é retornado o código de resposta 404', async () => {
      await controller.deleteSale(req, res);
    
      expect(res.status.calledWith(404)).to.be.true;
    });
    
    it('Verifica se é retornado uma mensagem', async () => {
      await controller.deleteSale(req, res);
    
      expect(res.json.calledWith({ message: 'Sale not found' })).to.be.true;
    });
  });
});
