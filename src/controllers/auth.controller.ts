import { User } from "../models";
import mysql, { Pool } from 'mysql2';
import jwt from 'jsonwebtoken';
import tokenCache, { TokenCache } from "../helpers/tokenCache";
import { verifyPassword } from "../helpers";


class AuthController {
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

    async login(user: any): Promise<any> {
        const { email, password } = user;

        console.log(email);

        const getUserRes = await this.db.query(`
            SELECT id, password
            FROM users
            WHERE email = ?
        `, [email]);

        console.log(getUserRes[0]);

        const { id, password: dbPassword } = getUserRes[0][0];

        console.log(id, '============');
        //check pw
        verifyPassword(password, dbPassword);

        const accessToken = jwt.sign({ email, id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15s' });
        const refreshToken = jwt.sign({ email, id }, process.env.REFRESH_TOKEN_SECRET!);

        // //cache refresh token
        this.tokenCache.set(id, refreshToken);

        return {
            accessToken
        };
    };

    async logout(accessToken: string): Promise<number> {
        const { id } = jwt.decode(accessToken!) as any;

        this.tokenCache.clear(id);

        return 200;
    }
}

export default new AuthController()