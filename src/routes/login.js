const routes = require("express").Router();
const bcrypt = require("bcrypt"); //การ encript

const User = require("../models/user");

routes.get("/", (req, res) => {
  res.render("login");
});

routes.post("/", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOneByEmail(email);
  if (user) {
    const compare = await bcrypt.compare(password, user.password);
    if (compare) {
      let session = req.session;
      session.userId = user.id;
      session.email = user.email;
      session.fname = user.fname;
      session.lname = user.lname;
      session.role = user.role;
      res.redirect("/");
      return;
    }
  }
  res.redirect(`/login?email=${email}&validate=false`);
});

module.exports = routes;
