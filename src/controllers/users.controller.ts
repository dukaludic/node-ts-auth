import { User } from "../models";
import mysql, { Pool } from 'mysql2';
import jwt from 'jsonwebtoken';
import { hashPassword } from "../helpers";

export class UsersController {
    private db: any;

    constructor() {
        this.db = mysql.createPool({
            host: process.env.HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB
        }).promise();
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
        const refreshToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET!);

        const hashedPassword = await hashPassword(password);

        const [rows] = await this.db.query(`
            INSERT INTO users (
                first_name,
                last_name,
                email,
                password,
                refresh_token
            ) VALUES (?, ?, ?, ?, ?)
        `, [firstName, lastName, email, hashedPassword, refreshToken]);

        return accessToken;
    }
}