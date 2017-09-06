/**
 * User: himanshujain.2792
 * Date: 10/12/16
 * Time: 11:13 PM
 * GET /
 * School controller.
 */

"use strict";

let models = require("../models/index");
let sequelize = require("sequelize");
let moment = require("moment");
let sessionUtils = require("../utils/sessionUtils");
let log = require("../helpers/logger");

module.exports.home = function (req, res) {
    res.render('sdp_home');
  //if (sessionUtils.checkExists(req, res, "user")) {
  //    res.render('sdp_home');
  //} else {
  //  console.log("ind");
  //  res.redirect('/login');
  //}
};

