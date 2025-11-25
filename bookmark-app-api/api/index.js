const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const { ConnectSessionKnexStore } = require("connect-session-knex");
const knex = require("../knex.js");
const axios = require("axios").default;

const urlRouter = require("../routes/api.js");

app.use("/api", require("../routes/api.js"));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "none",
    },
    store: new ConnectSessionKnexStore({
      knex: knex,
      tablename: "sessions",
    }),
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/", urlRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
});
