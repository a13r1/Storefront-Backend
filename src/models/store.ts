import client from '../database';
import { Product } from './types/product';

export class Store {
    async index_products(): Promise<Product[]> {
        try {
            const connection = await client.connect();
            const sql = 'select * from products';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get products ${err}`);
        }
    }

    async show_product(id: string): Promise<Product> {
        try {
            const connection = await client.connect();
            const sql = 'select * from products where id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot find product ${id}. Error: ${err}`);
        }
    }

    async create_product(product: Product): Promise<Product> {
        try {
            const connection = await client.connect();
            const sql =
                'insert into products(id, name, price) values($1, $2, $3) returning *';
            const result = await connection.query(sql, [
                product.id,
                product.name,
                product.price
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot add product ${product.id}. Error: ${err}`);
        }
    }

    async delete_product(id: string): Promise<Product> {
        try {
            const connection = await client.connect();
            const sql = 'delete from products where id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot delete product ${id}. Error: ${err}`);
        }
    }
}
