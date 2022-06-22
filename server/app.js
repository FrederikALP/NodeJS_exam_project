//Express
import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Path
import path from "path";
app.use(express.static(path.resolve("../client/public")));

//Mongoose
import mongoose from "mongoose";

//JWT

//Rate-limit
import rateLimit from "express-rate-limit";

//Helmet
import helmet from "helmet";
app.use(helmet());

//Body parser
import bodyParser from "body-parser";
app.use(bodyParser.json());

//Routers
import usersRouter from "./routers/usersRouter.js";
app.use(usersRouter);

//Cors
import cors from "cors";
app.use(cors());

//dotenv
import dotenv from "dotenv"
dotenv.config();

//MongoDB
mongoose.connect("mongodb+srv://"+process.env.MONGO_USER+":"+process.env.MONGO_PASSWORD+"@hearingimpairedforum.arjmn.mongodb.net/HearingImpaired?retryWrites=true&w=majority");
const db = mongoose.connection;
db.on('Error', console.log.bind(console, "DB connection error"));
db.once('open', function(callback) {
    console.log("DB connection established");
});

//Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Starting server on port:", PORT);
});