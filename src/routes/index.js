const routes = require("express").Router();
const login = require("./login");
const logout = require("./logout");
const register = require("./register");
const shop = require("./shop");
const cart = require("./cart");
const checkout = require("./checkout");
const order = require("./order");
const admin = require("./admin");
const Product = require("../models/product");

routes.get("/", async (req, res) => {
  let products = await Product.findAll();
  for (let i = 0; i < products.length; i++) {
    products[i].price = `฿ ${Number(products[i].price).toLocaleString("en")}`;
  }
  res.render("index", { products });
});

// not auth
routes.use("/login", login);
routes.use("/logout", logout);
routes.use("/register", register);
routes.use("/shop", shop);

// auth
routes.use("/cart", cart);
routes.use("/checkout", checkout);
routes.use("/order", order);

// admin
routes.use("/admin", admin);

module.exports = routes;
