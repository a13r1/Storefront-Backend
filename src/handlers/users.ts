import express, { Request, Response } from 'express';
import { Users } from '../models/users';
import { User } from '../models/types/user';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../database';
import authenticate from '../middleware/authentication';

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
        if (user === undefined) {
            throw new Error(`Cannot find user with id ${req.params.id}`);
        }
        res.json(user);
    } catch (err) {
        res.status(400);
        res.send((err as Error).message);
    }
};

const create = async (req: Request, res: Response) => {
    const newUser: User = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    };
    if (
        newUser.firstName === undefined ||
        newUser.lastName === undefined ||
        newUser.password === undefined
    ) {
        res.status(400);
        res.send(
            'Error creating user, provide firstName, lastName and password'
        );
        return;
    }
    try {
        const user = await users.create(newUser);
        const tokenSecret = TOKEN_SECRET as string;
        const token = jwt.sign({ user }, tokenSecret);
        res.json(token);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const usersRoutes = (app: express.Application) => {
    app.get('/users', authenticate, index);
    app.get('/users/:id', authenticate, show);
    app.post('/users', create);
};

export default usersRoutes;
