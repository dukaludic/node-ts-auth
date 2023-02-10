import { Tokens, User } from "../models";
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken, verifyPassword } from "../helpers";
import UsersService from "../services/users.service";

class AuthController {
    private usersService: typeof UsersService;

    constructor() {
        this.usersService = UsersService;
    }

    async login(user: User): Promise<Tokens | number> {
        const { email, password } = user;

        const dbUser = await this.usersService.getUserByEmail(email);

        if (!dbUser) {
            return 404;
        }

        const { id, password: dbPassword } = dbUser;

        await verifyPassword(password, dbPassword);

        const accessToken = generateAccessToken({ id, email });
        const refreshToken = generateRefreshToken({ id, email });

        return { accessToken, refreshToken };
    };

    async refreshToken(refreshToken: string): Promise<Tokens | number> {
        if (!refreshToken) return 401;

        const { id, email } = jwt.decode(refreshToken) as any;

        jwt.verify(refreshToken!, process.env.REFRESH_TOKEN_SECRET!, (err) => {
            if (err) return 403
        });

        const newAccessToken = generateAccessToken({ id, email })
        const newRefreshToken = generateRefreshToken({ id, email })

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }
}

export default new AuthController();