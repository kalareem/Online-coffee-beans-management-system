const routes = require("express").Router();
const CartItems = require("../models/cart_item");

routes.get("/", async (req, res) => {
  const { userId } = req.session;
  if (userId) {
    let items = await CartItems.findCartItemsByUserId(userId);
    let subtotal = 0;
    let amount = items.length;
    for (let i = 0; i < amount; i++) {
      const price = Number(items[i].price) * Number(items[i].quantity);
      subtotal += price;
      items[i].price = `฿ ${price.toLocaleString("en")}`;
    }
    res.render("cart", {
      items,
      amount,
      subtotal: `฿ ${subtotal.toLocaleString("en")}`,
    });
  } else {
    res.redirect(`/login`);
  }
});

routes.post("/", async (req, res) => {
  const { cartId, productId, quantity } = req.body;
  const cart = new CartItems(quantity, productId);
  await cart.update(cartId);
  res.status(200).json({ updated: true });
});

routes.delete("/item/:cartId/product/:productId", async (req, res) => {
  let deleted = false;
  const { cartId, productId } = req.params;

  const cartItem = await CartItems.findOneByCartIdAndProductId(
    cartId,
    productId
  );
  if (cartItem) {
    await CartItems.deleteByCartIdAndProductId(cartId, productId);
    deleted = true;
  }
  res.status(200).json({ deleted });
});

module.exports = routes;
