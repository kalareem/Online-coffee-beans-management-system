const routes = require("express").Router();
const User = require("../models/user");

routes.get("/", (req, res) => {
  res.render("register", {
    input: {
      fname: null,
      lname: null,
      sex: null,
      email: null,
      phone: null,
    },
    error: {
      email: false,
    },
  });
});

routes.post("/", async (req, res) => {
  const { fname, lname, sex, email, password, phone } = req.body;

  const user = await User.findOneByEmail(email);
  if (user) {
    res.render("register", {
      input: {
        fname,
        lname,
        sex,
        email,
        phone,
      },
      error: {
        email: true,
        email_message: "Email already in use.",
      },
    });
  } else {
    const register = new User(fname, lname, sex, email, password, phone);
    await register.create();
    res.redirect(`/login?email=${email}`);
  }
});

module.exports = routes;
