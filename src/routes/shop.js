const routes = require("express").Router();
const Product = require("../models/product");
const CartItems = require("../models/cart_item");

routes.get("/", async (req, res) => {
  let products = await Product.findAll();
  for (let i = 0; i < products.length; i++) {
    products[i].price = `฿ ${Number(products[i].price).toLocaleString("en")}`;
  }
  res.render("shop/index", { products });
});

routes.get("/:id", async (req, res) => {
  let product;
  const id = req.params.id;

  let products = await Product.findAll();
  for (let i = 0; i < products.length; i++) {
    products[i].price = `฿ ${Number(products[i].price).toLocaleString("en")}`;
    if (id == products[i].id) {
      product = products[i];
      products.splice(i, 1);
    }
  }
  if (product) {
    res.render("shop/id", { product, products });
  } else {
    res.redirect(`/shop`);
  }
});

routes.post("/:id", async (req, res) => {
  const id = req.params.id;
  const { quantity } = req.body;
  const { userId } = req.session;

  if (userId) {
    const cart = new CartItems(quantity, id);
    await cart.save(userId);
  }
  res.redirect(`/cart`);
});

module.exports = routes;
