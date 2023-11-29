import express, {Express} from 'express';
import * as database from "./config/database";
import dotenv from "dotenv";
import clientRoutes from './routes/client/index.route';
dotenv.config();

const app: Express = express();
const port: number | string = process.env.PORT || 3010;

database.connect();


app.set("views", "./views");
app.set("view engine", "pug");

clientRoutes(app);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});