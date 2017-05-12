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

let studentQuery = function (queryObj) {
  return new Promise(function (resolve, reject) {
    models.student.findAll(queryObj).then(function (data) {
      return resolve(data);
    }).catch(function (err) {
      log.error(err);
      return reject(err);
    });
  });
};


exports.studentQuery = studentQuery;

module.exports.student = function (req, res) {
  
  if(req.query.district) {
    attributes = ['block']
    group = 'district'
  } else if(req.query.block) {
    attributes = ['cluster']
    group = 'district'
  } else if(req.query.cluster) {
    attributes = ['school_name']
    group = 'district'
  } else {
    attributes = ['district']
    group = 'district'
  }
  Promise.all([
    studentQuery({
      raw: true,
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("id")), "count"],
        "grade"
      ],
      where: req.query,
      group: group
    })
  ]).then(function (data) {
    let response = {
      district: data[0]
    };
    log.info(response);
    res.json({"message": "Data", "result": response, "error": false});
  }).catch(function (err) {
    log.error(err);
    res.status(500).json({"message": "err", "err": err, "error": true});
  });
};


