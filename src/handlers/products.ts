import express, { Request, Response } from 'express';
import Products from '../models/products';
import Product from '../models/types/product';
import authenticate from '../middleware/authentication';

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
        if (product === undefined) {
            throw new Error(`Cannot find product with id ${req.params.id}`);
        }
        res.json(product);
    } catch (err) {
        res.status(400);
        res.send((err as Error).message);
    }
};

const create = async (req: Request, res: Response) => {
    if (req.body.name === undefined || req.body.price === undefined) {
        res.status(400);
        res.send('Error creating product, provide name and price');
        return;
    }
    const newProduct: Product = {
        name: req.body.name,
        price: req.body.price as unknown as number
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
    app.post('/products', authenticate, create);
};

export default productsRoutes;
