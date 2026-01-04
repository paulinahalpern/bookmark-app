const passport = require("passport");
const LocalStrategy = require("passport-local");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const { promisify } = require("util");
const pbkdf2 = promisify(crypto.pbkdf2);
const knex = require("../knex.js");

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const user = await knex("users").where({ username }).first();
      if (!user) {
        return cb(null, false, { message: "Incorrect username or password." });
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        function (err, hashedPassword) {
          if (err) return cb(err);
          if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
            return cb(null, false, {
              message: "Incorrect username or password.",
            });
          }
          return cb(null, user);
        }
      );
    } catch (err) {
      return cb(err);
    }
  })
);

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await knex("users").where({ username }).first();
    if (existingUser) {
      return res.status(409).json({ message: "user already exists" });
    }

    const salt = crypto.randomBytes(16);
    const hashedPassword = await pbkdf2(password, salt, 310000, 32, "sha256");
    await knex("users").insert({
      name: username,
      username,
      hashed_password: hashedPassword.toString("hex"),
      salt: salt.toString("hex"),
      provider: "local",
      provider_id: username,
    });
    console.log(username);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error("Error adding user", error);
  }
});

router.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: process.env.FRONTEND_URL_MAIN,
    failureRedirect: process.env.FRONTEND_URL_LOGIN,
  })
);
module.exports = router;
