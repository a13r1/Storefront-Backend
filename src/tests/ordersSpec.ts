import supertest from 'supertest';
import Orders from '../models/orders';
import app from '../server';

const orders = new Orders();

describe('Orders Table Actions', () => {
    it('should have a show method', () => {
        expect(orders.show).toBeDefined();
    });

    it('should return an empty list of orders from show method', async () => {
        const allOrders = await orders.show('1');
        expect(allOrders).toEqual([]);
    });
});

describe('Orders Endpoints', function () {
    it('should respond with status 401 (unauthorized) using GET /users/:user_id/orders/active', (done) => {
        supertest(app)
            .get('/users/1/orders/active')
            .set('Accept', 'application/json')
            .expect(401)
            .end(function (err, _res) {
                if (err) {
                    done.fail(err);
                } else {
                    done();
                }
            });
    });
});
