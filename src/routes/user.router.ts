import { Request, Response, Router } from 'express';
import UsersController from '../controllers/users.controller';
import { validation } from '../middlewares';
import { InsertUserRes } from '../models';

const router = Router();

/**
 * @openapi
 * /users/:id:
 *  get:
 *     tags:
 *     - Users
 *     summary: Get user by ID
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID of the user to retrieve
 *     security:
 *          - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *             properties:
 *              id:
 *                type: number
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *      401:
 *        description: Unauthorized
 *      404:
 *        description: Not Found
 */
router.get('/users/:id', validation, async (req: Request, res: Response) => {
    const user = await UsersController.getUserById(Number(req.params.id));
    res.send(user);
});

/**
 * @openapi
 * '/register':
 *  post:
 *     tags:
 *     - Users
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
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
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *      409:
 *        description: Conflict
 */
router.post('/register', async (req: Request, res: Response) => {
    const insertUserRes = await UsersController.insertUser(req.body);

    if (!insertUserRes.hasOwnProperty('accessToken')) {
        res.sendStatus(insertUserRes as number);
    } else {
        const { accessToken, refreshToken, userId } = insertUserRes as InsertUserRes;

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 59,
            httpOnly: true
        });

        res.send({ accessToken, userId });
    }
});

export default router;