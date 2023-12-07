import express, {Express} from 'express';
import * as database from "./config/database";
import dotenv from "dotenv";
import clientRoutes from './routes/client/index.route';
import adminRoutes from './routes/admin/index.route';
import { systemConfig } from './config/config';
import path from 'path';
dotenv.config();

const app: Express = express();
const port: number | string = process.env.PORT || 3010;

database.connect();

app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/tinymce",
    express.static(path.join(__dirname, "node_modules/tinymce"))
);  

app.locals.prefixAdmin = systemConfig.prefixAdmin;

clientRoutes(app);
adminRoutes(app);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});