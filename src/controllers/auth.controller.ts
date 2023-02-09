import { User } from "../models";
import mysql from 'mysql2';
import jwt from 'jsonwebtoken';
import tokenCache, { TokenCache } from "../helpers/tokenCache";
import { generateAccessToken, generateRefreshToken, verifyPassword } from "../helpers";


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

    async login(user: User): Promise<{ accessToken: string }> {
        const { email, password } = user;

        console.log(email);

        const getUserRes = await this.db.query(`
            SELECT id, password
            FROM users
            WHERE email = ?
        `, [email]);

        console.log(getUserRes[0]);

        const { id, password: dbPassword } = getUserRes[0][0];

        //check pw
        verifyPassword(password, dbPassword);


        const accessToken = generateAccessToken({ id, email });

        const refreshToken = generateRefreshToken({ id, email });

        // //cache refresh token
        this.tokenCache.set(id, refreshToken);

        return { accessToken };
    };

    async logout(accessToken: string): Promise<number> {
        const { id } = jwt.decode(accessToken!) as any;

        this.tokenCache.clear(id);

        return 200;
    }

    async refreshToken(accessToken: string): Promise<{ accessToken: string } | number> {
        const { id, email } = jwt.decode(accessToken) as any;


        console.log(id, accessToken, email, '==========bp1');

        //try get from cache
        const refreshToken = tokenCache.tryGet(id);

        console.log(refreshToken, '===refresh token')


        let token: string;

        if (!refreshToken) return 403;

        //verify refresh token
        jwt.verify(refreshToken!, process.env.REFRESH_TOKEN_SECRET!, (err, decoded) => {
            console.log('PRE REFRESH TOKEN GEN')
            //refresh access token
            if (err) return 403
            try {

                token = generateAccessToken({ id, email })
            } catch (error) {
                console.log(error);
            }


            console.log(token, '===bp2');
        })

        return { accessToken: token! };
    }
}

export default new AuthController()