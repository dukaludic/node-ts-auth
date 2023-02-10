import { Request, Response, Router } from 'express';
import AuthController from '../controllers/auth.controller';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
    const { accessToken, refreshToken } = await AuthController.login(req.body);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true
    });
    res.send({ accessToken });
});

router.get('/logout', async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];

    const response = await AuthController.logout(token!);

    res.sendStatus(response);
});

router.get('/refresh', async (req: Request, res: Response) => {
    const refreshToken = req.headers.authorization?.split(' ')[1];

    if (!refreshToken) return res.sendStatus(401);

    const response = await AuthController.refreshToken(refreshToken);

    res.send(response)
})

export default router;