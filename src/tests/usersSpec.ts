import Users from '../models/users';
import User from '../models/types/user';

const users = new Users();

describe('Users Endpoints', () => {
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
