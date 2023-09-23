const USER = "users";
const bcrypt = require("bcrypt");
const database = require("../database");

const ROLE = {
  ADMIN: "admin",
  CUSTOMER: "customer",
};

class User {
  constructor(fname, lname, sex, email, password, phone) {
    this.fname = fname;
    this.lname = lname;
    this.sex = sex;
    this.email = email;
    this.password = bcrypt.hashSync(password, 5);
    this.phone = phone;
  }

  async create() {
    const sql = `INSERT INTO ${USER} (fname, lname, sex, email, password, phone, role) VALUES('${this.fname}', '${this.lname}', '${this.sex}', '${this.email}', '${this.password}', '${this.phone}', '${ROLE.CUSTOMER}')`;
    await database.execute(sql);
  }

  async update() {
    const sql = `UPDATE ${USER} SET fname = '${this.fname}', lname = '${this.lname}' WHERE id = '${this.id}'`;
    await database.execute(sql);
  }

  static async findOneById(id) {
    const sql = `SELECT * FROM ${USER} WHERE id = '${id}'`;
    const [rows] = await database.execute(sql);

    return rows[0];
  }

  static async findOneByEmail(email) {
    const sql = `SELECT * FROM ${USER} WHERE email = '${email}'`;
    const [rows] = await database.execute(sql);

    return rows[0];
  }
}

module.exports = User;
