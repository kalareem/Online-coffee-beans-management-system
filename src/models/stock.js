const STOCKS = "stocks";
const PRODUCTS = "products";
const database = require("../database");

class Stock {
  constructor(quantity, shelf_number, shelf_level) {
    this.quantity = quantity;
    this.shelf_number = shelf_number;
    this.shelf_level = shelf_level;
  }

  async update(id) {
    const sql = `UPDATE ${STOCKS} SET quantity = ${this.quantity}, shelf_number = ${this.shelf_number}, shelf_level = ${this.shelf_level} WHERE id = '${id}'`;
    await database.execute(sql);
  }

  static async create(productId) {
    const sql = `INSERT INTO ${STOCKS} (quantity, product_id) VALUES(0, '${productId}')`;
    await database.execute(sql);
  }

  static async findAll() {
    const sql = `SELECT ${STOCKS}.*, ${PRODUCTS}.name, ${PRODUCTS}.picture FROM ${STOCKS} INNER JOIN ${PRODUCTS} ON ${STOCKS}.product_id = ${PRODUCTS}.id`;
    const [rows] = await database.execute(sql);

    return rows;
  }

  static async findOneById(id) {
    const sql = `SELECT * FROM ${STOCKS} WHERE id = ${id}`;
    const [rows] = await database.execute(sql);

    return rows[0];
  }
}

module.exports = Stock;
