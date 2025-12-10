const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oidc");
const knex = require("../knex.js");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile"],
    },
    async function verify(issuer, profile, cb) {
      try {
        let user = await knex("users")
          .where({ provider: issuer, provider_id: profile.id })
          .first();

        if (!user) {
          const [newUser] = await knex("users")
            .insert({
              name: profile.displayName,
              provider: issuer,
              provider_id: profile.id,
            })
            .returning("*");
          user = newUser;
        }

        return cb(null, user);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, { id: user.id, username: user.username, name: user.name });
});

passport.deserializeUser(function (user, cb) {
  return cb(null, user);
});

router.get("/auth/google", passport.authenticate("google"));

router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL_MAIN,
    failureRedirect: process.env.FRONTEND_URL_LOGIN,
  })
);

router.get("/auth/logout", (req, res) => {
  req.logout(() => {
    res.redirect(process.env.FRONTEND_URL_LOGIN);
  });
});

module.exports = router;
