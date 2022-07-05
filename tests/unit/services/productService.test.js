const sinon = require('sinon');
const { expect } = require('chai');
const model = require('../../../models/productModel');
const service = require('../../../services/productService');
const mock = require('../mocks/productMock');

describe('Realizando teste da camada Service de produtos', () => {
  describe('Testando a função getAll', () => {
    beforeEach(() => sinon.stub(model, 'getAll').resolves(mock));

    afterEach(() => sinon.restore());

    it('Verifica se um objeto é retornado', async () => {
      const products = await service.getAll();

      expect(products).to.be.a('object');
    });

    it('Verifica se o objeto retornado possui um código de resposta e um array com os produtos', async () => {
      const products = await service.getAll();

      expect(products).to.be.deep.equal({ code: 200, products: mock });
    });

    it('Verifica se o código de resposta é igual a 200', async () => {
      const products = await service.getAll();

      expect(products.code).to.be.equal(200);
    });

    it('Verifica se o array de produtos está ordenado pelo campo Id', async () => {
      const array = await service.getAll();

      expect(array.products[0]).to.have.property('id', 1);
      expect(array.products[1]).to.have.property('id', 2);
      expect(array.products[2]).to.have.property('id', 3);
    });
  });

  describe('Testando a função findById', () => {
    beforeEach(() => sinon.stub(model, 'findById').resolves([mock[0]]));

    afterEach(() => sinon.restore());

    it('Verifica se um objeto é retornado', async () => {
      const product = await service.findById(1);
      
      expect(product).to.be.a('object');
    });

    it('Verifica se o código de resposta é igual a 200', async () => {
      const product = await service.findById(1);
      
      expect(product.code).to.be.equal(200);
    });

    it('Verifica se o objeto retornado contem o produto correto', async () => {
      const object = await service.findById(1);
      
      expect(object.product).to.be.deep.equal(mock[0]);
    });
  });

  describe('Testando a função findById, caso o produto buscado não exista', () => {
    beforeEach(() => sinon.stub(model, 'findById').resolves([]));

    afterEach(() => sinon.restore());

    it('Verifica se um objeto é retornado', async () => {
      const product = await service.findById(99);
      
      expect(product).to.be.a('object');
    });

    it('Verifica se o código de resposta é igual a 404', async () => {
      const product = await service.findById(99);
      
      expect(product.code).to.be.equal(404);
    });

    it('Verifica se é retornado uma mensagem informando que o produto não foi encontrado', async () => {
      const product = await service.findById(99);

      expect(product.message).to.be.equal('Product not found');
    });
  });

  describe('Testando a fução addProduct', () => {
    beforeEach(() => sinon.stub(model, 'addProduct').resolves({ id: 4 }));

    afterEach(() => sinon.restore());

    it('Verifica se um objeto é retornado', async () => {
      const product = await service.addProduct({ name: 'Armadura Mark II' });
      
      expect(product).to.be.a('object');
    });
    
    it('Verifica se o objeto retornado contem o código de resposta 201', async () => {
      const product = await service.addProduct({ name: 'Armadura Mark II' });

      expect(product.code).to.be.equal(201);
    });
    
    it('Verifica se é retonado o produto que foi inserido', async () => {
      const product = await service.addProduct({ name: 'Armadura Mark II' });

      expect(product.product).to.be.deep.equal({ id: 4, name: 'Armadura Mark II' });
    });
  });

  describe('Testando a função addProduct, caso o produto inserido seja inválido', () => {
    beforeEach(() => sinon.stub(model, 'addProduct').resolves({ id: 4 }));
    
    afterEach(() => sinon.restore());

    it('Verifica se retorna um objeto', async () => {
      const product = await service.addProduct({ name: 'Armadura Mark II' });
      
      expect(product).to.be.a('object');
    });

    it('Verifica se o objeto retornado contem um código de resposta 400 quando um nome não é informado', async () => {
      const product = await service.addProduct({});
      
      expect(product.code).to.be.equal(400);
    });

    it('Verifica se quando um nome não é informado, uma mensagem é retornada', async () => {
      const product = await service.addProduct({});
      
      expect(product.message).to.be.equal('"name" is required');
    });

    it('Verifica se o objeto retornado contem um código de resposta 422, caso o nome informado tiver menos de 5 letras', async () => {
      const product = await service.addProduct({ name: 'abc' });
      
      expect(product.code).to.be.equal(422);
    });

    it('Verifica se caso o nome tiver menos de 5 letras, uma mensagem é retornada', async () => {
      const product = await service.addProduct({ name: 'abc' });
      
      expect(product.message).to.be.equal('"name" length must be at least 5 characters long');
    });
  });

  describe('Testando a função updateProduct', () => {
    beforeEach(() => {
      sinon.stub(model, 'updateProduct').resolves(true);
      sinon.stub(model, 'findById').resolves([mock[0]]);
    });

    afterEach(() => sinon.restore());

    it('Verifica se é retornado um objeto', async () => {
      const product = await service.updateProduct({ id: 1, name: 'Rompe Tormentas' });
    
      expect(product).to.be.a('object');
    });

    it('Verifica se o objeto retornado contem o código de resposta 200', async () => {
      const product = await service.updateProduct({ id: 1, name: 'Rompe Tormentas' });
    
      expect(product.code).to.be.equal(200);
    });

    it('Verifica se o produto atualizado é retornado', async () => {
      const product = await service.updateProduct({ id: 1, name: 'Rompe Tormentas' });
    
      expect(product).to.be.deep.equal({ code: 200, id: 1, name: 'Rompe Tormentas' });
    });
  });

  describe('Testando a função updateProduct, caso as informações inseridas sejam inválidas', () => {
    describe('Caso a Id fornecida seja inválida', () => {
      beforeEach(() => sinon.stub(model, 'updateProduct').resolves(true));

      afterEach(() => sinon.restore());

      it('Verifica se um objeto é retornado', async () => {
        const product = await service.updateProduct({ id: 99, name: 'Rompe Tormentas' });
        
        expect(product).to.be.a('object');
      });

      it('Verifica se o objeto retornado contem o código de resposta 404', async () => {
        const product = await service.updateProduct({ id: 99, name: 'Rompe Tormentas' });
        
        expect(product.code).to.be.equal(404);
      });

      it('Verifica se uma mensagem é retornada', async () => {
        const product = await service.updateProduct({ id: 99, name: 'Rompe Tormentas' });
        
        expect(product.message).to.be.equal('Product not found');
      });
    });

    describe('Caso o nome fornecido seja inválido', () => {
      beforeEach(() => sinon.stub(model, 'updateProduct').resolves(true));

      afterEach(() => sinon.restore());

      it('verifica se é retornado um objeto', async () => {
        const product = await service.updateProduct({ id: 1, name: 'abc' });
        
        expect(product).to.be.a('object');
      });
      
      it('Verifica se o objeto retornado contem o código de resposta 400, caso um nome não seja informado', async () => {
        const product = await service.updateProduct({ id: 1 });
        
        expect(product.code).to.be.equal(400);
      });
      
      it('Verifica se o objeto retornado contem uma mensagem, caso um nome não seja informado', async () => {
        const product = await service.updateProduct({ id: 1 });
        
        expect(product.message).to.be.equal('"name" is required');
      });

      it('Verifica se o objeto retornado contem o código de resposta 422, caso o nome informado tenha menos de 5 letras', async () => {
        const product = await service.updateProduct({ id: 1, name: 'abc' });
        
        expect(product.code).to.be.equal(422);
      });
      
      it('Verifica se o objeto retornado contem uma mensagem, caso o nome informado tenha menos de 5 letras', async () => {
        const product = await service.updateProduct({ id: 1, name: 'abc' });
        
        expect(product.message).to.be.equal('"name" length must be at least 5 characters long');
      });
    });
  });

  describe('Testando a função deleteProduct', () => {
    beforeEach(() => {
      sinon.stub(model, 'deleteProduct').resolves(true);
      sinon.stub(model, 'findById').resolves([mock[0]]);
    });

    afterEach(() => sinon.restore());

    it('Verifica se um objeto é retornado', async () => {
      const product = await service.deleteProduct(1);
      
      expect(product).to.be.a('object');
    });

    it('Verifica se o objeto retornado contem o código de resposta 204', async () => {
      const product = await service.deleteProduct(1);
      
      expect(product).to.be.deep.equal({ code: 204 });
    });
  });

  describe('Testando a função deleteProduct, caso o Id informado seja inválido', () => {
    beforeEach(() => {
      sinon.stub(model, 'deleteProduct').resolves(true);
      sinon.stub(model, 'findById').resolves([]);
    });
    
    afterEach(() => sinon.restore());
    
    it('Verifica se um objeto é retornado', async () => {
      const product = await service.deleteProduct(99);
    
      expect(product).to.be.a('object');
    });
    
    it('Verifica se o objeto retornado contem o código de resposta 404', async () => {
      const product = await service.deleteProduct(99);
    
      expect(product.code).to.be.equal(404);
    });
    
    it('Verifica se o objeto retornado contem uma mensagem', async () => {
      const product = await service.deleteProduct(99);
    
      expect(product.message).to.be.equal('Product not found');
    });
  });

  describe('Testando a função search', () => {
    beforeEach(() => sinon.stub(model, 'search').resolves([mock[2]]));

    afterEach(() => sinon.restore());

    it('returns an object', async () => {
      const products = await service.search('Escudo');
    
      expect(products).to.be.a('object');
    });
    
    it('returns an object with the code 200', async () => {
      const products = await service.search('Escudo');
    
      expect(products.code).to.equal(200);
    });
    
    it('returns an object with the array of matches', async () => {
      const productList = await service.search('Escudo');
    
      expect(productList.products).to.be.deep.equal([mock[2]]);
    });
  });
});
