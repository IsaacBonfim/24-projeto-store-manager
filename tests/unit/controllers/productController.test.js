const sinon = require('sinon');
const { expect } = require('chai');
const model = require('../../../models/productModel');
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

      sinon.stub(service, 'findById').resolves({ code: 200, product: mock[0] });
    });

    afterEach(() => sinon.restore());

    it('Verifica se o código retornado é igual a 200', async () => {
      await controller.findById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
    });

    it('Verifica se o objeto com o produto retorna em json', async () => {
      await controller.findById(req, res);

      expect(res.json.calledWith(mock[0])).to.be.true;
    });
  });

  describe('Testando a função findById, caso o produto buscado não exista', () => {
    const req = {};
    const res = {};

    beforeEach(() => {
      req.params = { id: 99 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(service, 'findById').resolves({ code: 404, message: 'Product not found' });
    });

    afterEach(() => sinon.restore());

    it('Verifica se o código retornado é igual a 404', async () => {
      await controller.findById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
    });

    it('Verifica se o objeto com o produto retorna em json contendo uma mensagem', async () => {
      await controller.findById(req, res);

      expect(res.json.calledWith({ message: 'Product not found' })).to.be.true;
    });
  });

  describe('Testando a função addProduct', () => {
    const req = {};
    const res = {};

    beforeEach(() => {
      req.body = { name: 'Armadura Mark II' };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(service, 'addProduct')
        .resolves({ code: 201, product: { id: 4, name: 'Armadura Mark II' } });
    });

    afterEach(() => sinon.restore());

    it('Verifica se o objeto retornado contem o código de resposta 201', async () => {
      await controller.addProduct(req, res);
      
      expect(res.status.calledWith(201)).to.be.true;
    });

    it('Verifica se é retonado o produto que foi inserido', async () => {
      await controller.addProduct(req, res);

      expect(res.json.calledWith({ id: 4, name: 'Armadura Mark II' }))
        .to.be.true;
    });
  });

  describe('Testando a função addProduct, caso o produto inserido seja inválido', () => {
    describe('Testando caso o nome não seja informado', () => {
      const req = {};
      const res = {};

      beforeEach(() => {
        req.body = { name: 'abc' };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(service, 'addProduct')
          .resolves({ code: 422, message: '"name" length must be at least 5 characters long' });
      });

      afterEach(() => sinon.restore());

      it('Verifica se o objeto retornado contem um código de resposta 422', async () => {
        await controller.addProduct(req, res);

        expect(res.status.calledWith(422)).to.be.true;
      });

      it('Verifica se o objeto retornado contem uma mensagem', async () => {
        await controller.addProduct(req, res);

        expect(res.json.calledWith({ message: '"name" length must be at least 5 characters long' }))
          .to.be.true;
      });
    });

    describe('Testando caso o nome informado tenha menos de 5 letras', () => {
      const req = {};
      const res = {};

      beforeEach(() => {
        req.body = { name: '' };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(service, 'addProduct')
          .resolves({ code: 400, message: '"name" is required' });
      });

      afterEach(() => sinon.restore());

      it('Verifica se o objeto retornado contem um código de resposta 400', async () => {
        await controller.addProduct(req, res);

        expect(res.status.calledWith(400)).to.be.true;
      });

      it('Verifica se o objeto retornado contem uma mensagem', async () => {
        await controller.addProduct(req, res);

        expect(res.json.calledWith({ message: '"name" is required' }))
          .to.be.true;
      });
    });
  });

  describe('Testando a função updateProduct', () => {
    const req = {};
    const res = {};

    beforeEach(() => {
      req.params = { id: 1 };
      req.body = { name: 'Rompe Tormentas' };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(service, 'updateProduct')
        .resolves({ code: 200, id: 1, name: 'Rompe Tormentas' });
      
      sinon.stub(model, 'findById').resolves([{ id: 1, name: 'Martelo de Thor' }]);
    });

    afterEach(() => sinon.restore());

    it('Verifica se o código de resposta é 200', async () => {
      await controller.updateProduct(req, res);
      
      expect(res.status.calledWith(200)).to.be.true;
    });

    it('Verifica se é retornado o produto atualizado', async () => {
      await controller.updateProduct(req, res);
      
      expect(res.json.calledWith({ id: 1, name: 'Rompe Tormentas' })).to.be.true;
    });
  });

  describe('Testando a função updateProduct, caso as informações inseridas sejam inválidas', () => {
    describe('Caso o Id informado seja inválido', () => {
      const req = {};
      const res = {};
      
      beforeEach(() => {
        req.params = { id: 99 };
        req.body = { name: 'Manopla do Infinito' };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        
        sinon.stub(service, 'addProduct')
          .resolves({ code: 404, message: 'Product not found' });
      });

      afterEach(() => sinon.restore());

      it('Verifica se o código de resposta é 404', async () => {
        await controller.updateProduct(req, res);
        
        expect(res.status.calledWith(404)).to.be.true;
      });

      it('Verifica se uma mensagem é retornada', async () => {
        await controller.updateProduct(req, res);
        
        expect(res.json.calledWith({ message: 'Product not found' })).to.be.true;
      });
    });

    describe('Caso não seja informado um nome', () => {
      const req = {};
      const res = {};

      beforeEach(() => {
        req.params = { id: 1 };
        req.body = { name: '' };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(service, 'updateProduct')
          .resolves({ code: 400, message: '"name" is required' });
      });

      afterEach(() => sinon.restore());

      it('Verifica se o código de resposta é 400', async () => {
        await controller.updateProduct(req, res);
        
        expect(res.status.calledWith(400)).to.be.true;
      });

      it('Verifica se uma mensagem é retornada', async () => {
        await controller.updateProduct(req, res);
        
        expect(res.json.calledWith({ message: '"name" is required' })).to.be.true;
      });
    });

    describe('Caso o nome informado tenha menos de 5 letras', () => {
      const req = {};
      const res = {};

      beforeEach(() => {
        req.params = { id: 1 };
        req.body = { name: 'abc' };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        
        sinon.stub(service, 'updateProduct')
          .resolves({ code: 422, message: '"name" length must be at least 5 characters long' });
      });

      afterEach(() => sinon.restore());

      it('Verifica se o código de resposta é 422', async () => {
        await controller.updateProduct(req, res);
        
        expect(res.status.calledWith(422)).to.be.true;
      });

      it('Verifica se uma mensagem é retornada', async () => {
        await controller.updateProduct(req, res);
        
        expect(res.json.calledWith({ message: '"name" length must be at least 5 characters long' }))
          .to.be.true;
      });
    });
  });
});
