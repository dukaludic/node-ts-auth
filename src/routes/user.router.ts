import { Request, Response, Router } from 'express';
import UsersController from '../controllers/users.controller';
import { validation } from '../middlewares';

import dotenv from 'dotenv';

dotenv.config();

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */
router.get('/users/:id', validation, async (req: Request, res: Response) => {
    const user = await UsersController.getUserById(Number(req.params.id));
    res.send(user);
});

router.post('/register', async (req: Request, res: Response) => {
    const { accessToken, refreshToken } = await UsersController.insertUser(req.body);

    res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 59,
        httpOnly: true
    });

    res.send({ accessToken });
});

export default router;