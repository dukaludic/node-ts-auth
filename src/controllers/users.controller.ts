import { Tokens, User } from "../models";
import mysql, { Pool } from 'mysql2';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken, hashPassword } from "../helpers";
import tokenCache, { TokenCache } from "../helpers/tokenCache";
import UsersService from "../services/users.service";

class UsersController {
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

    async getUserById(id: number): Promise<User> {

        console.log('GetUserById');
        const user = await this.usersService.getUserById(id);
        return user;
    };

    async insertUser(user: User): Promise<Tokens> {
        const { email } = user;

        const { id } = await this.usersService.insertUser(user);

        const accessToken = generateAccessToken({ id, email });
        const refreshToken = generateRefreshToken({ id, email });

        this.tokenCache.set(id, refreshToken);

        return { accessToken, refreshToken };
    }
}

export default new UsersController();