import Orders from '../models/orders';

const orders = new Orders();

describe('Orders Endpoints', () => {
    it('should have a show method', () => {
        expect(orders.show).toBeDefined();
    });

    it('should return an empty list of orders from show method', async () => {
        const allOrders = await orders.show('1');
        expect(allOrders).toEqual([]);
    });
});
