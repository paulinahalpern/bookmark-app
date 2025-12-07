let express = require("express");
let router = express.Router();
const { isLoggedIn } = require("../lib/ensure-login");

router.get("/users/me", isLoggedIn, async (req, res) => {
  console.log(req.user);
  res.json(req.user);
});

module.exports = router;
