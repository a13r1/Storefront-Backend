import express, { Request, Response } from 'express';
import { Orders } from '../models/orders';

const orders = new Orders();

const show = async (req: Request, res: Response) => {
    try {
        const currentOrders = await orders.show(req.params.user_id);
        res.json(currentOrders);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const ordersRoutes = (app: express.Application) => {
    app.get('/users/:user_id/current_orders', show);
};

export default ordersRoutes;
