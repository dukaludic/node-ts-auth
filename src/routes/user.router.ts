import express, { Request, Response, Router } from 'express';
import { UsersController } from '../controllers/users.controller';
import { validation } from '../middlewares';
import jwt from 'jsonwebtoken';

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
    const repo = new UsersController();
    const response = await repo.getUserById(req.params.id);
    res.send(response);
});

router.post('/register', async (req: Request, res: Response) => {
    const repo = new UsersController();
    const accessToken = await repo.insertUser(req.body);

    res.send({ accessToken })
});

export default router;