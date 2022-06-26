import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../database';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization;
        let token;
        if (authorization) {
            token = authorization.split(' ')[1];
        } else {
            token = '';
        }
        const tokenSecret = TOKEN_SECRET as string;
        const decoded = jwt.verify(token, tokenSecret);
        res.locals.userData = decoded;
        next();
    } catch (err) {
        res.status(401);
        res.json('Access denied, invalid token!');
    }
};

export default authenticate;
