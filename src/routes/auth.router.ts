import { Request, Response, Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { Tokens } from '../models';

const router = Router();

/**
 * @openapi
 * '/login':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Log in a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *             properties:
 *              accessToken:
 *                type: string
 *      404:
 *        description: Not Found
 */
router.post('/login', async (req: Request, res: Response) => {
    const response = await AuthController.login(req.body);

    if (!response.hasOwnProperty('accessToken')) {
        res.sendStatus(response as number);
    } else {
        const { accessToken, refreshToken } = response as Tokens

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 59,
            httpOnly: true
        });
        res.send({ accessToken });
    }
});


/**
 * @openapi
 * '/logout':
 *  get:
 *     tags:
 *     - Auth
 *     summary: Log out a user
 *     responses:
 *      200:
 *        description: Success
 */
router.get('/logout', async (req: Request, res: Response) => {
    res.clearCookie("refreshToken");
    res.sendStatus(200);
});

/**
 * @openapi
 * '/refresh':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Refresh tokens
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *             properties:
 *              accessToken:
 *                type: string
 *      401:
 *        description: Unauthorized
 */
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