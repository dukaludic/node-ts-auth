import { InsertUserRes, User } from "../models";
import { generateAccessToken, generateRefreshToken } from "../helpers";
import UsersService from "../services/users.service";

class UsersController {
    private usersService: typeof UsersService;

    constructor() {
        this.usersService = UsersService;
    }

    async getUserById(id: number): Promise<User> {
        const user = await this.usersService.getUserById(id);
        return user;
    };

    async insertUser(user: User): Promise<InsertUserRes | number> {
        const { email } = user;

        const response = await this.usersService.insertUser(user);

        if (!response.hasOwnProperty('id')) {
            return response as number;
        }

        const { id } = response as { id: number };

        const accessToken = generateAccessToken({ id, email });
        const refreshToken = generateRefreshToken({ id, email });

        return { accessToken, refreshToken, userId: id };
    }
}

export default new UsersController();