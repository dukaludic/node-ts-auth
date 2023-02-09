import express, { Request, Response, Router } from 'express';
import { UsersController } from '../controllers/users.controller';
import { validation } from '../middlewares';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

const router = Router();

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