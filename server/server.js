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
import essentialRoutes from "./routes/essential.routes.js";
import phrRoutes from "./routes/phr.routes.js";
import blogroutes from "./routes/blog.route.js";
import blog from "./data/blog.js";
import payment from "./routes/payment.route.js";
import cart from "./routes/cart.route.js";
import chat from "./routes/chat.route.js";
import vet from "./routes/vet.routes.js";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'; 

import { createServer } from 'http';
import { Server } from 'socket.io';
const app = express();
const port = process.env.PORT;
//middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.urlencoded({ extended: true , limit: "50mb"}));
app.use(express.json({limit: "50mb"})); 
app.use(cookieParser());
app.use(
  session({
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
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8080/api/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      return done(null, profile);
    } catch (error) {
      return done(error, null);
    }
  }
));
passport.use(new Strategy(User.authenticate()));
passport.serializeUser((user, done) => {
  if (user.emails) {
    done(null, { type: 'google', email: user.emails[0].value });
  } else {
    done(null, { type: 'local', id: user._id });
  }
});

passport.deserializeUser(async (serializedUser, done) => {
  try {
    let user;
    if (serializedUser.type === 'google') {
      user = await User.findOne({ email: serializedUser.email });
    } else {
      user = await User.findById(serializedUser.id);
    }
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
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
    console.log(err);
  });


//routes
app.use("/api", userRoutes);
app.use("/api", mainRoutes);
app.use("/api", phrRoutes);
app.use("/api", essentialRoutes);
app.use("/api", blogroutes);
app.use("/api/paypal", payment);
app.use("/api", cart);
app.use("/api", chat);
app.use("/api", vet);


app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
