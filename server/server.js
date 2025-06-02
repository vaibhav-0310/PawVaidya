import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import cookieParser from "cookie-parser";
import "dotenv/config";
import User from "./schema/user.schema.js";
import userRoutes from "./routes/user.routes.js";
import mainRoutes from "./routes/main.routes.js";
import MongoStore from 'connect-mongo';
const app = express();
const port = process.env.PORT;
//middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    secret: process.env.SESSION_SECRET || "random",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      secure:false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};

connect()
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(e);
  });


//routes
app.use(userRoutes);
app.use(mainRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to PawVaidya" });
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
