import { Tokens, User } from "../models";
import mysql from 'mysql2';
import jwt from 'jsonwebtoken';
import tokenCache, { TokenCache } from "../helpers/tokenCache";
import { generateAccessToken, generateRefreshToken, verifyPassword } from "../helpers";
import UsersService from "../services/users.service";

class AuthController {
    private db: any;
    private tokenCache: TokenCache;
    private usersService: typeof UsersService;

    constructor() {
        this.db = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        }).promise();

        this.tokenCache = tokenCache;
        this.usersService = UsersService;
    }

    async login(user: User): Promise<Tokens> {
        const { email, password } = user;

        console.log(email);

        const getUserRes = await this.usersService.getUserByEmail(email);

        console.log(getUserRes);

        const { id, password: dbPassword } = getUserRes;

        verifyPassword(password, dbPassword);

        const accessToken = generateAccessToken({ id, email });
        const refreshToken = generateRefreshToken({ id, email });

        this.tokenCache.set(id, refreshToken);

        return { accessToken, refreshToken };
    };

    async logout(accessToken: string): Promise<number> {
        const { id } = jwt.decode(accessToken!) as any;

        this.tokenCache.clear(id);

        return 200;
    }

    async refreshToken(refreshToken: string): Promise<Tokens | number> {
        const { id, email } = jwt.decode(refreshToken) as any;

        if (!refreshToken) return 401;

        jwt.verify(refreshToken!, process.env.REFRESH_TOKEN_SECRET!, (err) => {
            if (err) return 403
        });

        const expectedAccessToken = this.tokenCache.tryGet(id);

        if (expectedAccessToken !== refreshToken) {
            return 403;
        }

        const newAccessToken = generateAccessToken({ id, email })
        const newRefreshToken = generateRefreshToken({ id, email })

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }
}

export default new AuthController();