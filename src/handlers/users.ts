import express, { Request, Response } from 'express';
import { Users } from '../models/users';
import { User } from '../models/types/user';

const users = new Users();

const index = async (_req: Request, res: Response) => {
    try {
        const allUsers = await users.index();
        res.json(allUsers);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const user = await users.show(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const create = async (req: Request, res: Response) => {
    const newUser: User = {
        firstName: req.query.firstName as string,
        lastName: req.query.lastName as string,
        password: req.query.password as string
    };
    try {
        const user = await users.create(newUser);
        res.json(user);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const usersRoutes = (app: express.Application) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
};

export default usersRoutes;
