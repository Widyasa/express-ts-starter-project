import express, {NextFunction} from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import {router} from "./routes";
import {sendResponse} from "./utils/sendResponse";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api', router)
app.use((req, res, next) => {
    return sendResponse(res, false, null, "Routes not Found", 404)
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});