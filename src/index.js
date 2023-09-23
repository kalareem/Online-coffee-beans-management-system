// Bring in our dependencies
const path = require("path");
const express = require("express");
const session = require("express-session");
const upload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const parser = require("body-parser");
const config = require("./config");
const routes = require("./routes");
require("./database");

const app = express();
const POST = config.system.port;

// Set up session
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: config.session.secret,
    cookie: {
      maxAge: config.session.cookieAge,
    },
  })
);
app.use(cookieParser());

// Set up upload file
app.use(upload());

// Set up middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Set up template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Set up body-parser
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

//  Connect all our routes to our application
app.use("/", routes);
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/upload", express.static(path.join(__dirname, "../upload")));

// Turn on that application!
app.listen(POST, () => {
  console.log(`Application listening at http://localhost:${POST}`);
});

/*app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});*/
