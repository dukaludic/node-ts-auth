import { NextFunction, Request, Response } from 'express';
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const validation = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.split(' ')[1];

    if (!accessToken) return res.sendStatus(401);

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
        if (err) {
            if (err.message === 'jwt expired') return res.status(403).send('Access token expired');
        }
        (req as any).user = decoded;
        next();
    })
};