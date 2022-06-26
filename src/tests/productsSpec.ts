import Products from '../models/products';

const products = new Products();

describe('Products Model', () => {
    it('should have an index method', () => {
        expect(products.index).toBeDefined();
    });

    it('should return a list of products from index method', async () => {
        const allProducts = await products.index();
        expect(allProducts).toEqual([]);
    });
});
