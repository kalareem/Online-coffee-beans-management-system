const CARTS = "carts";
const database = require("../database");

class Cart {
  constructor() {}

  static async create(user_id) {
    const sql = `INSERT INTO ${CARTS} (available, user_id) VALUES(true, '${user_id}')`;
    await database.execute(sql);
  }

  static async close(id) {
    const sql = `UPDATE ${CARTS} SET available = false WHERE id = '${id}'`;
    await database.execute(sql);
  }

  static async findAvailable(user_id) {
    const sql = `SELECT * FROM ${CARTS} WHERE available = true AND user_id = '${user_id}'`;
    const [rows] = await database.execute(sql);

    return rows[0];
  }
}

module.exports = Cart;
