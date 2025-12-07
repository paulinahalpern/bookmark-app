const { ensureLoggedIn } = require("connect-ensure-login");

module.exports = {
  isLoggedIn: ensureLoggedIn("/login"),
};
