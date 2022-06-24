import express, { Request, Response } from 'express';
import { Products } from '../models/products';
import { Product } from '../models/types/product';

const products = new Products();

const index = async (_req: Request, res: Response) => {
    try {
        const allProducts = await products.index();
        res.json(allProducts);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const product = await products.show(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const create = async (req: Request, res: Response) => {
    const newProduct: Product = {
        name: req.query.name as string,
        price: req.query.price as unknown as number
    };
    try {
        const product = await products.create(newProduct);
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const productsRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
};

export default productsRoutes;
