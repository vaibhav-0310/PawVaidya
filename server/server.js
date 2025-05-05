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

const app = express();
const port = process.env.PORT;
//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "vaibhav",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);
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

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
