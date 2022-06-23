//Express
import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//dotenv
import dotenv from "dotenv"
dotenv.config();

//Path
import path from "path";
app.use(express.static(path.resolve("../client/public")));

//Mongoose
import mongoose from "mongoose";

//Rate-limit
import rateLimit from "express-rate-limit";

//Helmet
import helmet from "helmet";
app.use(helmet());

//Body parser
import bodyParser from "body-parser";
app.use(bodyParser.json());

//session
import session from "express-session";
app.use(session({
    secret: process.env.SESSION_SECRET,
    name: "hearingimpairedforum",
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 10
     }
}));

//Cors
import cors from "cors";
app.use(cors());

//MongoDB
mongoose.connect("mongodb+srv://"+process.env.MONGO_USER+":"+process.env.MONGO_PASSWORD+"@hearingimpairedforum.arjmn.mongodb.net/HearingImpaired?retryWrites=true&w=majority");
const db = mongoose.connection;
db.on('Error', console.log.bind(console, "DB connection error"));
db.once('open', function(callback) {
    console.log("DB connection established");
});

//Routers
import usersRouter from "./routers/usersRouter.js"; 
import forumsRouter from "./routers/forumsRouter.js"
import subForumsRouter from "./routers/subForumsRouter.js";
import postsRouter from "./routers/postRouter.js";
app.use(usersRouter, forumsRouter, subForumsRouter, postsRouter);

//Default fallback
app.get('*', (req, res) => {
    res.sendFile(path.resolve("../client/public/index.html"));
});

//Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Starting server on port:", PORT);
});