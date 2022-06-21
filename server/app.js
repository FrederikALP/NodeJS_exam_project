import path from "path";

//Express
import express from "express";
const app = express();
app.use(express.static(path.resolve("../client/public")));
app.use(express.urlencoded({extended: true}));

//Mongoose
import mongoose from "mongoose";

//Session
import session from "express-session";

//Rate-limit
import rateLimit from "express-rate-limit";

//Helmet
import helmet from "helmet";
app.use(helmet());

//Cors
import cors from "cors";
app.use(cors());

//Body parser
import bodyParser from "body-parser";
app.use(bodyParser.json());

//Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Starting server on port:", PORT);
});