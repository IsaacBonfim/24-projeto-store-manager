const sinon = require('sinon');
const { expect } = require('chai');
const service = require('../../../services/productService');
const controller = require('../../../controllers/productController');
const mock = require('../mocks/productMock');

describe('Realizando teste da camada Controller de produtos', () => {
  describe('Testando a função getAll', () => {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(service, 'getAll').resolves({ code: 200, products: mock });
    });

    afterEach(() => sinon.restore());

    it('Verifica se o código retornado é igual a 200', async () => {
      await controller.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it('Verifica se o array de produtos retorna em json', async () => {
      await controller.getAll(req, res);

      expect(res.json.calledWith({ products: mock }));
    });
  });

  describe('Testando a função findById', () => {
    const req = {};
    const res = {};

    beforeEach(() => {
      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(service, 'findById').resolves({ code: 200, products: mock[0] });
    });

    afterEach(() => sinon.restore());

    it('Verifica se o código retornado é igual a 200', async () => {
      await controller.findById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it('Verifica se o objeto com o produtos retorna em json', async () => {
      await controller.findById(req, res);

      expect(res.json.calledWith(mock[0])).to.be.true;
    });
  });
});
