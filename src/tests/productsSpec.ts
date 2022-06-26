import Products from '../models/products';
import Product from '../models/types/product';
import supertest from 'supertest';
import app from '../server';

const products = new Products();

describe('Products Table Actions', () => {
    it('should have an index method', () => {
        expect(products.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(products.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(products.create).toBeDefined();
    });

    it('should return an empty list of products from index method', async () => {
        const allProducts = await products.index();
        expect(allProducts).toEqual([]);
    });

    it('should create and return a product', async () => {
        const newProduct: Product = { name: 'product1', price: 2.5 };
        const product = await products.create(newProduct);
        expect(product).toEqual({ id: 1, name: 'product1', price: 2.5 });
    });

    it('should return a list of one product from index method', async () => {
        const allProducts = await products.index();
        expect(allProducts).toEqual([{ id: 1, name: 'product1', price: 2.5 }]);
    });

    it('should return a product from show method', async () => {
        const product = await products.show('1');
        expect(product).toEqual({ id: 1, name: 'product1', price: 2.5 });
    });
});

describe('Products Endpoints', function () {
    it('should respond with status 200 (ok) using GET /products', (done) => {
        supertest(app)
            .get('/products')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, _res) {
                if (err) {
                    done.fail(err);
                } else {
                    done();
                }
            });
    });

    it('should respond with status 200 (ok) using GET /products/:id', (done) => {
        supertest(app)
            .get('/products/1')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    done.fail(err);
                } else {
                    done();
                }
            });
    });

    it('should respond with status 401 (unauthorized) using POST /products', (done) => {
        supertest(app)
            .post('/products')
            .set('Accept', 'application/json')
            .expect(401)
            .end(function (err, res) {
                if (err) {
                    done.fail(err);
                } else {
                    done();
                }
            });
    });
});
