const PRODUCTS = "products";
const Stock = require("./stock");
const database = require("../database");

class Product {
  constructor(name, description, price, picture) {
    this.name = name;
    this.price = price;
    this.picture = picture;
    this.description = description;
  }

  async create() {
    const sql = `INSERT INTO ${PRODUCTS} (name, price, picture, description, available) VALUES('${this.name}', ${this.price}, '${this.picture}', '${this.description}', false)`;
    const [rows] = await database.execute(sql);
    await Stock.create(rows.insertId);
  }

  async update(id) {
    const sql = `UPDATE ${PRODUCTS} SET name = '${this.name}', description = '${this.description}', price = ${this.price}, picture = '${this.picture}' WHERE id = '${id}'`;
    await database.execute(sql);
  }

  static async findAll() {
    const sql = `SELECT * FROM ${PRODUCTS}`;
    const [rows] = await database.execute(sql);

    return rows;
  }

  static async findOneById(id) {
    const sql = `SELECT * FROM ${PRODUCTS} WHERE id = ${id}`;
    const [rows] = await database.execute(sql);

    return rows[0];
  }

  static async deleteById(id) {
    const sql = `DELETE FROM ${PRODUCTS} WHERE id = ${id}`;
    await database.execute(sql);
  }
}

module.exports = Product;
