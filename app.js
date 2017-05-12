/**
 * Module dependencies.
 */

"use strict";

let express = require("express");
let compression = require("compression");
let bodyParser = require("body-parser");
let logger = require("morgan");
let cors = require("cors");
let errorHandler = require("errorhandler");
// let lusca = require('lusca');
let dotenv = require("dotenv");
let expressValidator = require("express-validator");
let errorController = require("./controllers/errorController");
let passport = require("passport");
let session = require("express-session");
let cookieParser = require("cookie-parser");
let Strategy = require("passport-local").Strategy;
let sessionUtils = require("./utils/sessionUtils");
let _ = require("underscore");
let log = require("./helpers/logger");
let rp = require('request-promise');
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: ".env" });

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.UI_URL);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Credentials", true);

  next();
};

/**
 * Create Express server.
 */
let app = express();

/**
 * development error handler
 *
 * will print stacktrace
 */
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: true,
      data: { error: err }
    });
  });
}

/**
 * production error handler
 *
 * no stacktraces leaked to user
 */
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: true,
    data: { }
  });
});

/**
 * Express configuration.
 */
app.use(cors());
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 4);
app.set("x-powered-by", false);
app.set("view options", {pretty: true});
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());

app.use(allowCrossDomain);

let models = require("./models");

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  models.agents.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use(new Strategy({
  usernameField: "email",
  passwordField: "password",
  session: false,
  passReqToCallback: true
},
    function (req, email, password, done) {
      models.agents.findOne({where: {email: email}}).then(function (user) {
        // if (err) { return done(err); }
        if (!user) {
          console.log("Incorrect email.");
          return done(null, false, { message: "Incorrect email." });
        }
      }).catch(function (err) {
        console.log(err);
        if (err) { return done(err); }
      });
    }
));

app.use(passport.initialize());
app.use(passport.session());


/**
 * Error Handler.
 */
if (app.get("env") === "dev") {
  app.use(errorHandler());
}

app.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect(process.env.UI_URL+"/auth.html"); }
    Promise.all([brandQuery(user)])
    .then(function (data) {
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        log.error(err);
        return res.redirect(process.env.UI_URL);
      });
    }).catch(function (err) {
      console.log(err);
    });

  })(req, res, next);
});

app.use(function (req, res, next) {
  // res.locals.login = req.isAuthenticated();
  // if (sessionUtils.checkExists(req, res, "restaurants")) {
  //   let user = sessionUtils.getData(req, res, "user");
  //   req.user = user;
    next();
  // } else {
  //   res.status(401).json({"message": "Unauthorised", "err": {}, "error": true});
  // }
});

/**
 * our routes will be contained in routes/indexRoutes.js
 */
let routes = require("./routes/indexRoutes");
let schoolRoutes = require("./routes/schoolRoutes");

app.use("/", routes);
app.use("/school", schoolRoutes);

/**
 * catch 404 and forward to error handler
 */

app.all("*", errorController._404);

app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  log.error(err);
  next(err);
});

/**
 * Start Express server.
 */
app.listen(app.get("port"), function () {
  console.log("Express server listening on port %d in %s mode", app.get("port"), app.get("env"));
});

module.exports = app;
