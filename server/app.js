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
    const baseLimiter = rateLimit({
      //the line below limits the window auth times, after 15 minutes the limit will be reset
    windowMs: 15 * 60 * 1000, // 15 minutes
      //The client is allowed to access 5 times
    max: 100, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const authLimiter = rateLimit({
      //the line below limits the window auth times, after 15 minutes the limit will be reset
    windowMs: 15 * 60 * 1000, // 15 minutes
      //The client is allowed to access 5 times
    max: 5, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(baseLimiter);
app.use("/auth/", authLimiter);


//Helmet
//"img-src" : ["'self'", "data: https:"] is generally to be avoided but for the sake of having an image from outside sources it is used.
import helmet from "helmet";
app.use(helmet.contentSecurityPolicy({
    directives: {
      "img-src" : ["'self'", "data: https:"]
    }
  })
);

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
import commentsRouter from "./routers/commentRouter.js";
app.use(usersRouter, forumsRouter, subForumsRouter, postsRouter, commentsRouter);

//Default fallback
app.get('*', (req, res) => {
    res.sendFile(path.resolve("../client/public/index.html"));
});

import http from "http";
const server = http.createServer(app);

//Socket.io
import {init} from './socketIO.js';
const io = init(server)
io.on("connection", (socket) => {
  console.log(socket.id)
});

//Port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log("Starting server on port:", PORT);
});