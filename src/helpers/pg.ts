import { Pool } from 'pg';
import config from '../config/config';

const pool = new Pool(config.db);

export class Pg {
    static getPool = () => {
        return pool;
    };

    static execute = async (query) => {
        try {
            await pool.connect();     // gets connection
            await pool.query(query);  // sends queries
            return true;
        } catch (error) {
            console.error(error.stack);
            return false;
        } finally {
            //await pool.end();         // closes connection
        }
    };
}