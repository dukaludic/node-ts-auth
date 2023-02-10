import { Request, Response, Router } from 'express';
import AuthController from '../controllers/auth.controller';
import dotenv from 'dotenv';
import { Tokens } from '../models';

dotenv.config();

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
    const { accessToken, refreshToken } = await AuthController.login(req.body);

    res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 59,
        httpOnly: true
    });
    res.send({ accessToken });
});

router.get('/logout', async (req: Request, res: Response) => {
    res.clearCookie("refreshToken");
    res.sendStatus(200);
});

router.get('/refresh', async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;

    if (!token) return res.sendStatus(401);

    const response = await AuthController.refreshToken(token);

    if (typeof response === 'object' && response.hasOwnProperty('accessToken')) {
        res.cookie('refreshToken', response.refreshToken, {
            maxAge: 1000 * 60 * 59,
            httpOnly: true
        });

        return res.send({ accessToken: response.accessToken });
    }

    res.sendStatus(response as number);
})

export default router;