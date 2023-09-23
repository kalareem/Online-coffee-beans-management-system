const routes = require("express").Router();
const product = require("./product");
const order = require("./order");
const stock = require("./stock");

routes.get("/", (req, res) => {
  res.render("admin/index");
});

routes.use("/product", product);
routes.use("/order", order);
routes.use("/stock", stock);

module.exports = routes;
