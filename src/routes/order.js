const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.render("order");
});

module.exports = routes;
