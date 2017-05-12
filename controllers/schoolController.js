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
// let sessionUtils = require("../utils/sessionUtils");
let log = require("../helpers/logger");

module.exports.index = function (req, res) {
  res.json({"message": "Home", "result": {}, "error": false});
};

let schoolQuery = function (queryObj) {
  return new Promise(function (resolve, reject) {
    models.school_info.findAll(queryObj).then(function (data) {
      return resolve(data);
    }).catch(function (err) {
      log.error(err);
      return reject(err);
    });
  });
};

exports.schoolQuery = schoolQuery;

module.exports.school = function (req, res) {
  let attributes = [];
  let group = '';
  let requested_data = '';
  if(req.query.district) {
    attributes = ['block'];
    requested_data = 'block';
  } else if(req.query.block) {
    attributes = ['cluster'];
    requested_data = 'cluster';
  } else if(req.query.cluster) {
    attributes = ['school_name'];
    requested_data = 'school_name';
  } else {
    attributes = ['district'];
    requested_data = 'district';
  }
  Promise.all([
    schoolQuery({
      raw: true,
      attributes: attributes,
      where: req.query,
      group: requested_data
    })
  ]).then(function (data) {
    let response = {};
    response[requested_data] = data[0];
    log.info(response);
    res.json({"message": "Data", "result": response, "error": false});
  }).catch(function (err) {
    log.error(err);
    res.status(500).json({"message": "err", "err": err, "error": true});
  });
};


