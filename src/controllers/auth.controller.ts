import { Tokens, User } from "../models";
import mysql from 'mysql2';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken, verifyPassword } from "../helpers";
import UsersService from "../services/users.service";

class AuthController {
    private usersService: typeof UsersService;

    constructor() {
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

        return { accessToken, refreshToken };
    };

    async refreshToken(refreshToken: string): Promise<Tokens | number> {
        const { id, email } = jwt.decode(refreshToken) as any;

        if (!refreshToken) return 401;

        jwt.verify(refreshToken!, process.env.REFRESH_TOKEN_SECRET!, (err) => {
            if (err) return 403
        });

        const newAccessToken = generateAccessToken({ id, email })
        const newRefreshToken = generateRefreshToken({ id, email })

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }
}

export default new AuthController();