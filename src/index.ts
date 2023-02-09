import express from 'express';
import dotenv from "dotenv";
import UserRouter from './routes/user.router';
import AuthRouter from './routes/auth.router';
// TS ignore shouln't be used normally, but Swagger types were creating issues
// with Typescript build in my case and would require some time to fix

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './utils/swagger';

import YAML from 'js-yaml';
const swaggerDocument = YAML.load('./utils/docs.yaml');

dotenv.config();

const app = express();

app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(swaggerDocument!));

app.use(express.json());

app.use([UserRouter, AuthRouter]);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening on ${port}`)
});