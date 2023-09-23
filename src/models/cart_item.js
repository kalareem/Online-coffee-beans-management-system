const CARTS = "carts";
const PRODUCTS = "products";
const CART_ITEMS = "cart_items";
const Cart = require("./cart");
const database = require("../database");

class CartItems {
  constructor(quantity, product_id) {
    this.quantity = Number(quantity);
    this.product_id = product_id;
  }

  async create(cart_id) {
    const sql = `INSERT INTO ${CART_ITEMS} (quantity, product_id, cart_id) VALUES(${this.quantity}, '${this.product_id}', '${cart_id}')`;
    await database.execute(sql);
  }

  async update(cart_id) {
    const sql = `UPDATE ${CART_ITEMS} SET quantity = ${this.quantity} WHERE cart_id = '${cart_id}' AND product_id = '${this.product_id}'`;
    await database.execute(sql);
  }

  async save(user_id) {
    const cart = await Cart.findAvailable(user_id);
    if (!cart) {
      await Cart.create(user_id);
      await this.save(user_id);
    } else {
      let item = await CartItems.findOneByCartIdAndProductId(
        cart.id,
        this.product_id
      );
      if (item) {
        this.quantity += Number(item.quantity);
        await this.update(cart.id);
      } else {
        await this.create(cart.id);
      }
    }
  }

  static async findOneByCartIdAndProductId(cart_id, product_id) {
    const sql = `SELECT * FROM ${CART_ITEMS} WHERE cart_id = '${cart_id}' AND product_id = '${product_id}'`;
    const [rows] = await database.execute(sql);

    return rows[0];
  }

  static async findCartItemsByUserId(user_id) {
    const sql = `SELECT * FROM ${CART_ITEMS} INNER JOIN ${CARTS} ON ${CART_ITEMS}.cart_id = ${CARTS}.id INNER JOIN ${PRODUCTS} ON ${CART_ITEMS}.product_id = ${PRODUCTS}.id WHERE ${CARTS}.available = true AND ${CARTS}.user_id = '${user_id}'`;
    const [rows] = await database.execute(sql);

    return rows;
  }

  static async deleteByCartIdAndProductId(cart_id, product_id) {
    const sql = `DELETE FROM ${CART_ITEMS} WHERE cart_id = '${cart_id}' AND product_id = '${product_id}'`;
    await database.execute(sql);
  }
}

module.exports = CartItems;
