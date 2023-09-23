const routes = require("express").Router();

routes.get("/", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = routes;
