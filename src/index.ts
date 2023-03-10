import express from 'express';
import dotenv from "dotenv";
import UserRouter from './routes/user.router';
import AuthRouter from './routes/auth.router';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './utils/swagger';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cookieParser());
app.use(express.json());

app.use([UserRouter, AuthRouter]);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening on ${port}`)
});