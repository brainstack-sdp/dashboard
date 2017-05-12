/**
 * User: Himanshu Jain
 * Time: 10:52 PM
 * To change this template use File | Settings | File Templates.
 */
"use strict";

let _ = require("underscore");
// let log = require("../helpers/logger");

module.exports = {
  setData: function (req, res, name, data) {
    let b = new Buffer(JSON.stringify(data));
    let cookie = b.toString("base64");
    // log.info(`setting cookie: ${name} `);
    res.cookie(name, cookie, { maxAge: 86400000, httpOnly: true });
  },
  getData: function (req, res, name) {
    let cookie = req.cookies[name];
    let b = new Buffer(cookie, "base64");
    let data = b.toString();
    // log.info(`getting cookie: ${name} `);
    return JSON.parse(data);
  },
  checkExists: function (req, res, name) {
    if (_.isUndefined(req.cookies[name])) {
      return false;
    } else {
      return true;
    }
  }
};
