const ORDERS = "orders";
const database = require("../database");
const Cart = require("./cart");
const CartItems = require("./cart_item");
const OrderAddress = require("./order_address");
const Stock = require("./stock");

const ORDER_STATUS = {
  PENDING: "pending",
};

class Order {
  constructor(total_price) {
    this.total_price = total_price;
  }

  async create(cart_id) {
    const sql = `INSERT INTO ${ORDERS} (status, total_price, cart_id) VALUES('${ORDER_STATUS.PENDING}', ${this.total_price}, '${cart_id}')`;
    const [rows] = await database.execute(sql);
    return rows.insertId;
  }

  static async checkout(user_id, body) {
    const items = await CartItems.findCartItemsByUserId(user_id);
    if (items.length > 0) {
      let total_price = 0;
      let cart_id = items[0].cart_id;
      for (let i = 0; i < items.length; i++) {
        const quantity = Number(items[i].quantity);
        const price = Number(items[i].price) * quantity;
        total_price += price;
      }
      const order = new Order(total_price);
      const orderId = await order.create(cart_id);
      const {
        fname,
        lname,
        address,
        district,
        province,
        postcode,
        phone,
        additional,
      } = body;

      const order_address = new OrderAddress(
        fname,
        lname,
        address,
        district,
        province,
        postcode,
        phone,
        additional
      );
      await order_address.create(orderId);
      await Cart.close(cart_id);
    }
  }
}

module.exports = Order;
