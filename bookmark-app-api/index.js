const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const { ConnectSessionKnexStore } = require("connect-session-knex");
const knex = require("./knex.js");
const axios = require("axios").default;
const authRouter = require("./routes/auth.js");
const urlRouter = require("./routes/bookmarks.js");
const usersRouter = require("./routes/users.js");

app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    preflightContinue: false,
  })
);

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      // secure: true,
      // sameSite: "none",
    },
    store: new ConnectSessionKnexStore({
      knex: knex,
      tablename: "sessions",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/", authRouter);
app.use("/", usersRouter);
app.use("/", urlRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
});
