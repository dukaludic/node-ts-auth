import { User } from "../models";
import mysql, { Pool } from 'mysql2';
import jwt from 'jsonwebtoken';

export class AuthController {
    private db: any;

    constructor() {
        this.db = mysql.createPool({
            host: process.env.HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB
        }).promise();
    }

    async login(user: any): Promise<any> {
        const { email, password } = user;

        console.log(email)

        const getUserRes = this.db.query(`
            SELECT id, password
            FROM users
            WHERE email = ?
        `, [email]);

        console.log(getUserRes.rows);

        return
        //check pw



        // const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15s' });
        // const refreshToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET!);



        // //save refresh token

        // const updateRes = this.db.query(`
        //     UPDATE users
        //     SET refresh_token = ?
        //     WHERE id = ?
        // `, [refreshToken, id])

        // return {
        //     accessToken
        // };
    };

    async logout(email: string): Promise<void> {

        const res = this.db.query(`
            UPDATE users
            SET refresh_token = NULL
            WHERE email = ?
        `, [email])

        return res;
    }
}