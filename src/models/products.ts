import { client } from '../database';
import { Product } from './types/product';

export class Products {
    async index(): Promise<Product[]> {
        try {
            const sql = 'select * from products;';
            const connection = await client.connect();
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get products ${err}`);
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const sql = 'select * from products where id=$1;';
            const connection = await client.connect();
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot find product ${id}. Error: ${err}`);
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            const sql =
                'insert into products(name, price) values($1, $2) returning *;';
            const connection = await client.connect();
            const result = await connection.query(sql, [
                product.name,
                product.price
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot add product ${product.id}. Error: ${err}`);
        }
    }
}
