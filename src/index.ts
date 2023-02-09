import express, { Request, Response } from 'express';
import dotenv from "dotenv";

import mysql from "mysql2";
import { validation } from './middlewares';
import UserRouter from './routes/user.router';
import AuthRouter from './routes/auth.router';
import swaggerDocs from './utils/swagger';

dotenv.config();


const app = express();

app.use(express.json());

app.use([UserRouter, AuthRouter]);

const port = process.env.PORT;

swaggerDocs(app, port!)

app.listen(port, () => {
    console.log(`Listening on ${port}`)
});