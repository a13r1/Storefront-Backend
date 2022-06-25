import { client, BCRYPT_PASSWORD, SALT_ROUNDS } from '../database';
import { User } from './types/user';
import bcrypt from 'bcrypt';

export class Users {
    async index(): Promise<User[]> {
        try {
            const sql = 'select * from users;';
            const connection = await client.connect();
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get users ${err}`);
        }
    }

    async show(id: string): Promise<User> {
        try {
            const sql = 'select * from users where id=$1;';
            const connection = await client.connect();
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot find user ${id}. Error: ${err}`);
        }
    }

    async create(user: User): Promise<User> {
        try {
            const sql =
                'insert into users(first_name, last_name, password) values($1, $2, $3) returning *;';
            const connection = await client.connect();
            const pepper = BCRYPT_PASSWORD as string;
            const saltRounds = parseInt(SALT_ROUNDS as string);
            const hashedPassword = bcrypt.hashSync(
                user.password + pepper,
                saltRounds
            );
            const result = await connection.query(sql, [
                user.firstName,
                user.lastName,
                hashedPassword
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot add user ${user.id}. Error: ${err}`);
        }
    }
}
