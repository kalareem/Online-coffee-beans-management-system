const routes = require("express").Router();

routes.get("/", async (req, res) => {
  res.render("admin/order");
});

module.exports = routes;
