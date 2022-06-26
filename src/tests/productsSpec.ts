import Products from '../models/products';
import Product from '../models/types/product';

const products = new Products();

describe('Products Endpoints', () => {
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
