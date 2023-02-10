import { Tokens, User } from "../models";
import { generateAccessToken, generateRefreshToken } from "../helpers";
import UsersService from "../services/users.service";

class UsersController {
    private usersService: typeof UsersService;

    constructor() {
        this.usersService = UsersService;
    }

    async getUserById(id: number): Promise<User> {

        console.log('GetUserById');
        const user = await this.usersService.getUserById(id);
        return user;
    };

    async insertUser(user: User): Promise<Tokens> {
        const { email } = user;

        const id = await this.usersService.insertUser(user);

        const accessToken = generateAccessToken({ id, email });
        const refreshToken = generateRefreshToken({ id, email });

        return { accessToken, refreshToken };
    }
}

export default new UsersController();