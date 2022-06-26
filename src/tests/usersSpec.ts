import Users from '../models/users';
import User from '../models/types/user';
import supertest from 'supertest';
import app from '../server';

const users = new Users();

describe('Users Table Actions', () => {
    it('should have an index method', () => {
        expect(users.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(users.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(users.create).toBeDefined();
    });

    it('should return an empty list of users from index method', async () => {
        const allProducts = await users.index();
        expect(allProducts).toEqual([]);
    });

    it('should create and return a user', async () => {
        const newUser: User = {
            firstName: 'John',
            lastName: 'Doe',
            password: 'pass123'
        };
        const user = await users.create(newUser);
        expect(user.id).toEqual(1);
    });

    it('should return a list of one user from index method', async () => {
        const allUsers = await users.index();
        expect(allUsers.length).toEqual(1);
    });

    it('should return a user from show method', async () => {
        const user = await users.show('1');
        expect(user.id).toEqual(1);
    });
});

describe('Users Endpoints', function () {
    it('should respond with status 401 (unauthorized) using GET /users', (done) => {
        supertest(app)
            .get('/users')
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

    it('should respond with status 401 (unauthorized) using GET /users/:id', (done) => {
        supertest(app)
            .get('/users/1')
            .set('Accept', 'application/json')
            .expect(401)
            .end(function (err, res) {
                if (err) {
                    done.fail(err);
                } else {
                    done();
                }
            });
    });

    it('should respond with status 400 (bad request) using POST /users', (done) => {
        supertest(app)
            .post('/users')
            .set('Accept', 'application/json')
            .expect(400)
            .end(function (err, res) {
                if (err) {
                    done.fail(err);
                } else {
                    done();
                }
            });
    });
});
