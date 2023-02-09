import { NextFunction, Request, Response } from 'express';
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import tokenCache from "../helpers/tokenCache";

dotenv.config();

export const validation = (req: Request, res: Response, next: NextFunction) => {

    console.log('======================')

    const accessToken = req.headers.authorization?.split(' ')[1];

    if (!accessToken) return res.sendStatus(401);

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
        if (err) {
            console.log(err);
        }
        (req as any).user = decoded;
    })

    next();
};