const routes = require("express").Router();
const Stock = require("../../models/stock");

routes.get("/", async (req, res) => {
  const stocks = await Stock.findAll();
  res.render("admin/stock", { stocks });
});

routes.post("/", async (req, res) => {
  const { id, quantity, shelf_number, shelf_level } = req.body;
  const stock = await Stock.findOneById(id);
  if (stock) {
    const update = new Stock(quantity, shelf_number, shelf_level);
    await update.update(id);
  }
  res.redirect("/admin/stock");
});

module.exports = routes;
