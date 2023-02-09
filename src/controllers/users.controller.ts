import { User } from "../models";
import mysql, { Pool } from 'mysql2';
import jwt from 'jsonwebtoken';
import { hashPassword } from "../helpers";
import tokenCache, { TokenCache } from "../helpers/tokenCache";

export class UsersController {
    private db: any;
    private tokenCache: TokenCache;

    constructor() {
        this.db = mysql.createPool({
            host: process.env.HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB
        }).promise();

        this.tokenCache = tokenCache;
    }

    async getUserById(id: string): Promise<any> {

        console.log('GetUserById');

        const [rows] = await this.db.query(`
            SELECT first_name, last_name, email, password
            FROM users
            WHERE id = ?
        `, [id]);

        return rows;
    };

    async insertUser(user: User): Promise<any> {
        const { firstName, lastName, email, password } = user;

        const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15s' });
        const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET!);

        const hashedPassword = await hashPassword(password);

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

        const { id } = lastInsertedRes[0][0];

        console.log('id sto', id)
        // cache refresh token
        this.tokenCache.set(id, refreshToken);

        return accessToken;
    }
}