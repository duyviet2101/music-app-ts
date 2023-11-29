import express, {Express, Request, Response} from 'express';
import * as database from "./config/database";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const port: number | string = process.env.PORT || 3010;

database.connect();

app.set("views", "./views");
app.set("view engine", "pug");

app.get('/topics', (req: Request, res: Response) => {
    res.render("client/pages/topics/index")
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});