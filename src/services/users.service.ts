import mysql, { Pool } from 'mysql2';
import { hashPassword } from '../helpers';
import { User } from '../models';
import dotenv from 'dotenv';
dotenv.config();

class UsersService {
    private db: any;

    constructor() {
        this.db = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: 9009
        }).promise();
    }

    async getUserById(id: number): Promise<User> {
        const [rows] = await this.db.query(`
            SELECT first_name, last_name, email, password
            FROM users
            WHERE id = ?
        `, [id]);

        return rows[0];
    }

    async getUserByEmail(email: string): Promise<User> {
        const getUserRes = await this.db.query(`
            SELECT id, password
            FROM users
            WHERE email = ?
        `, [email]);

        return getUserRes[0][0];
    }



    async insertUser(user: User): Promise<{ id: number } | number> {
        const { firstName, lastName, email, password } = user;

        const hashedPassword = await hashPassword(password);

        let lastInsertedId: number;

        try {
            const insertUserRes = await this.db.query(`
            INSERT INTO users (
                first_name,
                last_name,
                email,
                password
            ) VALUES (?, ?, ?, ?)
        `, [firstName, lastName, email, hashedPassword]);

            const lastInsertedRes = await this.db.query(`
            SELECT MAX(id) as 'id' FROM users;
        `);
            lastInsertedId = lastInsertedRes[0][0].id

        } catch (error) {
            return 409;
        }

        return { id: lastInsertedId! }
    }
}

export default new UsersService();