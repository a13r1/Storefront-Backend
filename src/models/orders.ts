import { client } from '../database';
import Order from './types/order';

class Orders {
    async show(id: string): Promise<Order[]> {
        try {
            const sql =
                "select * from orders where user_id=$1 and status='active' order by id;";
            const connection = await client.connect();
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(
                `Cannot find current orders for user_id ${id}. Error: ${err}`
            );
        }
    }
}

export default Orders;
