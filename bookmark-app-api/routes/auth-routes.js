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
        Buffer.from(user.salt, "hex"),
        310000,
        32,
        "sha256",
        function (err, hashedPassword) {
          if (err) return cb(err);
          if (
            !crypto.timingSafeEqual(
              Buffer.from(user.hashed_password, "hex"),
              hashedPassword
            )
          ) {
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

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (user, cb) {
  knex("users").select("id", "username").where({ id }).first();
  return cb(null, user);
});

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

router.post("/login/password", (req, res, next) => {
  console.log("failed");
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: info.message || "Authentication failed" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login failed" });
      }
      return res.status(200).json({
        message: "Login successful",
        user: { id: user.id, username: user.username, name: user.name },
      });
    });
  })(req, res, next);
});

module.exports = router;
