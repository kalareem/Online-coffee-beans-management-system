const fs = require("fs");
const path = require("path");
const routes = require("express").Router();
const Product = require("../../models/product");

function removeFile(fileName) {
  const pathFile = path.join(__dirname, "../../../upload", fileName);
  if (fileName && fs.existsSync(pathFile)) {
    fs.unlink(pathFile, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
}

routes.get("/", async (req, res) => {
  const products = await Product.findAll();
  res.render("admin/product", { products });
});

routes.post("/", async (req, res) => {
  let picture = "";
  const { name, description, price } = req.body;

  if (req.files) {
    const file = req.files.image;
    const fileType = file.name.split(".").pop();
    const time = new Date().getTime();
    const fileName = `${time}.${fileType}`;
    const filePath = path.join(__dirname, "../../../upload", fileName);
    picture = fileName;
    file.mv(filePath, (err) => {
      if (err) {
        picture = "";
        console.error("error", err);
      }
    });
  }
  const product = new Product(name, description, price, picture);
  await product.create();
  res.redirect("/admin/product");
});

routes.post("/update", async (req, res) => {
  const { id, name, description, price } = req.body;
  const product = await Product.findOneById(id);

  if (product) {
    let picture = product.picture;
    if (req.files) {
      const file = req.files.image;
      const fileType = file.name.split(".").pop();
      const time = new Date().getTime();
      const fileName = `${time}.${fileType}`;
      const filePath = path.join(__dirname, "../../../upload", fileName);
      picture = fileName;
      file.mv(filePath, (err) => {
        if (err) {
          picture = "";
          console.error("error", err);
        }
      });
      removeFile(product.picture);
    }
    const update = new Product(name, description, price, picture);
    await update.update(id);
  }
  res.redirect("/admin/product");
});

routes.delete("/:id", async (req, res) => {
  let deleted = false;
  const { id } = req.params;
  const product = await Product.findOneById(id);

  if (product) {
    await Product.deleteById(id);
    removeFile(product.picture);
    deleted = true;
  }
  res.status(200).json({ deleted });
});

module.exports = routes;
