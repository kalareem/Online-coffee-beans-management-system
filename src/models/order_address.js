const USER = "users";
const ORDERS = "orders";
const ORDER_ADDRESS = "order_address";
const CARTS = "carts";
const database = require("../database");

class OrderAddress {
  constructor(
    fname,
    lname,
    address,
    district,
    province,
    postcode,
    phone,
    additional
  ) {
    this.fname = fname;
    this.lname = lname;
    this.address = address;
    this.district = district;
    this.province = province;
    this.postcode = postcode;
    this.phone = phone;
    this.additional = additional;
  }

  async create(order_id) {
    const sql = `INSERT INTO ${ORDER_ADDRESS} (fname, lname, address, district, province, postcode, phone, additional, order_id) VALUES('${this.fname}', '${this.lname}', '${this.address}', '${this.district}', '${this.province}', '${this.postcode}', '${this.phone}', '${this.additional}', '${order_id}')`;
    await database.execute(sql);
  }

  static async findById(id) {
    const sql = `SELECT * FROM ${ORDER_ADDRESS} WHERE id = ${id}`;
    const [rows] = await database.execute(sql);

    return rows;
  }

  static async findOneByUserId(user_id) {
    const sql = `SELECT ${ORDER_ADDRESS}.* FROM ${ORDER_ADDRESS} INNER JOIN ${ORDERS} ON ${ORDER_ADDRESS}.order_id = ${ORDERS}.id INNER JOIN ${CARTS} ON ${ORDERS}.cart_id = ${CARTS}.id INNER JOIN ${USER} ON ${CARTS}.user_id = ${USER}.id WHERE ${USER}.id = ${user_id} ORDER BY ${ORDER_ADDRESS}.created_at DESC`;
    const [rows] = await database.execute(sql);

    return rows[0];
  }
}

module.exports = OrderAddress;
