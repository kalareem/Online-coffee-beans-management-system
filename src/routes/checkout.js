const routes = require("express").Router();
const CartItems = require("../models/cart_item");
const Order = require("../models/order");
const OrderAddress = require("../models/order_address");
const User = require("../models/user");

routes.get("/", async (req, res) => {
  const { userId } = req.session;
  if (userId) {
    let items = await CartItems.findCartItemsByUserId(userId);
    let subtotal = 0;
    let amount = items.length;
    if (amount > 0) {
      for (let i = 0; i < amount; i++) {
        const price = Number(items[i].price) * Number(items[i].quantity);
        subtotal += price;
        items[i].price = `฿ ${price.toLocaleString("en")}`;
      }

      let address = await OrderAddress.findOneByUserId(userId);
      if (!address) {
        const user = await User.findOneById(userId);
        address = {
          fname: user.fname,
          lname: user.lname,
          phone: user.phone,
        };
      }

      res.render("checkout", {
        items,
        amount,
        address,
        subtotal: `฿ ${subtotal.toLocaleString("en")}`,
      });
    } else {
      res.redirect(`/cart`);
    }
  } else {
    res.redirect(`/login`);
  }
});

routes.post("/", async (req, res) => {
  const { userId } = req.session;
  if (userId) {
    await Order.checkout(userId, req.body);
    res.redirect(`/order`);
  } else {
    res.redirect(`/login`);
  }
});

module.exports = routes;
