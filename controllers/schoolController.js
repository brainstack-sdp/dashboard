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
  res.render('index');
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
  var attributes = [];
  var group = '';
  if(req.query.district) {
    attributes = ['block']
    group = 'block'
  } else if(req.query.block) {
    attributes = ['cluster']
    group = 'cluster'
  } else if(req.query.cluster) {
    attributes = ['school_name']
    group = 'school_name'
  } else if(req.query.school_name) {
    attributes = ['summer_winter']
    group = 'summer_winter'
  } else if(req.query.summer_winter) {
    attributes = ['class_'+req.query.class]
    group = 'class_'+req.query.class
  } else {
    attributes = ['district']
    group = 'district'
  }
  Promise.all([
    schoolQuery({
      raw: true,
      attributes: attributes,
      where: req.query,
      group: group
    })
  ]).then(function (data) {
      let response = {};
      response[group] = data[0];
    log.info(response);
    res.json({"message": "Data", "result": response, "error": false});
  }).catch(function (err) {
    log.error(err);
    res.status(500).json({"message": "err", "err": err, "error": true});
  });
};


