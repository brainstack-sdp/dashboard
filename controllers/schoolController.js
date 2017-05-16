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

module.exports.index = function (req, res) {
  if (sessionUtils.checkExists(req, res, "user")) {
    res.render('index');
  } else {
    console.log("ind");
    res.redirect('/login');
  }
};

module.exports.login = function (req, res) {
  res.render('login');
};

let schoolQuery = function (queryObj) {
  return new Promise(function (resolve, reject) {
    models.school.findAll(queryObj).then(function (data) {
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
  let whereSchool = undefined;
  if(req.query.district) {
    attributes = ['block'];
    group = 'block';
    whereSchool = req.query;
  } else if(req.query.block) {
    attributes = ['cluster'];
    group = 'cluster';
    whereSchool = req.query;
  } else if(req.query.cluster) {
    attributes = ['school_name'];
    group = 'school_name';
    whereSchool = req.query;
  } else if(req.query.school_name) {
    attributes = ['summer_winter'];
    group = 'summer_winter';
    whereSchool = req.query;
  } else {
    attributes = ['district']
    group = 'district'
  }
  Promise.all([
    schoolQuery({
      raw: true,
      attributes: attributes,
      where: whereSchool,
      group: group
    })
  ]).then(function (data) {
      let response = {};
      response[group] = data[0];
    res.json({"message": "Data", "result": response, "error": false});
  }).catch(function (err) {
    log.error(err);
    res.status(500).json({"message": "err", "err": err, "error": true});
  });
};


module.exports.enrollment = function (req, res) {
  let attributes = [];
  let group = '';
  let whereSchool = undefined;
  if(req.query.district) {
    group = 'block';
    whereSchool = req.query;
  } else if(req.query.block) {
    group = 'cluster';
    whereSchool = req.query;
  } else if(req.query.cluster) {
    group = 'school_name';
    whereSchool = req.query;
  } else if(req.query.school_name) {
    group = 'summer_winter';
    whereSchool = req.query;
  } else {
    group = 'district'
  }
  Promise.all([
    schoolQuery({
      raw: true,
      attributes: [
        [sequelize.fn("SUM", sequelize.col("class_1")), "class_1"],
        [sequelize.fn("SUM", sequelize.col("class_2")), "class_2"],
        [sequelize.fn("SUM", sequelize.col("class_3")), "class_3"],
        [sequelize.fn("SUM", sequelize.col("class_4")), "class_4"],
        [sequelize.fn("SUM", sequelize.col("class_5")), "class_5"],
        [sequelize.fn("SUM", sequelize.col("class_6")), "class_6"],
        [sequelize.fn("SUM", sequelize.col("class_7")), "class_7"],
        [sequelize.fn("SUM", sequelize.col("class_8")), "class_8"],
        [sequelize.fn("SUM", sequelize.col("class_9")), "class_9"],
        [sequelize.fn("SUM", sequelize.col("class_10")), "class_10"],
        [sequelize.fn("SUM", sequelize.col("class_11")), "class_11"],
        [sequelize.fn("SUM", sequelize.col("class_11")), "class_12"],
      ],
      where: whereSchool
    })
  ]).then(function (data) {
      let response = {student_enrolled:0};
      for(let cls in data[0][0]){
        if(cls!= 'class_'+req.query.class_code){
          response['student_enrolled'] += data[0][0][cls];
        }
      }
    res.json({"message": "Data", "result": response, "error": false});
  }).catch(function (err) {
    log.error(err);
    res.status(500).json({"message": "err", "err": err, "error": true});
  });
};


