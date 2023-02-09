import { Request, Response, Router } from 'express';
import AuthController from '../controllers/auth.controller';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import tokenCache from '../helpers/tokenCache';
import { generateAccessToken } from '../helpers';

dotenv.config();

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
    const accessToken = await AuthController.login(req.body);
    res.send(accessToken);
});

interface VerifyRes {
    email: string;
    firstName: string;
    lastName: string;
}

router.get('/logout', async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];

    const response = await AuthController.logout(token!);

    res.sendStatus(response);
});

router.get('/refresh', async (req: Request, res: Response) => {
    const accessToken = req.headers.authorization?.split(' ')[1];

    const { email } = jwt.decode(accessToken!) as any;

    //try get from cache
    const refreshToken = tokenCache.tryGet(email);

    console.log(refreshToken, 'refresh token')

    if (!refreshToken) return res.sendStatus(403);
    //refresh access token
    jwt.verify(refreshToken!, process.env.REFRESH_TOKEN_SECRET!, (err, decoded) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ email })

        console.log(accessToken, '====accessToken')

        res.json({ accessToken: accessToken })
    })
})

export default router;