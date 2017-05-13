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
  } else if(req.query.class) {
    attributes = ['class_'+req.query.class]
    group = 'class_'+req.query.class
  } else {
    attributes = ['district']
    group = 'district'
  }
  Promise.all([
    studentQuery({
      raw: true,
      include: [{
        model: models.school_info,
        as: "SI",
        attributes: [],
        required: true,
        where: req.query
      }],
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("student.id")), "count"],
        "grade"
      ],
      where: {
        grade: {
          $ne: null
        }
      },
      group: "grade"
    }),
    studentQuery({
      raw: true,
      include: [{
        model: models.school_info,
        as: "SI",
        attributes: [],
        required: true,
        where: req.query
      }],
      attributes: [
        [sequelize.fn("SUM", sequelize.col("student.sum")), "sum"],
        [sequelize.fn("SUM", sequelize.col("student.max_marks")), "max_marks"],
        "subject",
        "SI."+group
      ],
      where: {
        subject: {
          $ne: null
        }
      },
      group: ["subject", "SI."+group]
    }),
    studentQuery({
      raw: true,
      include: [{
        model: models.school_info,
        as: "SI",
        attributes: [],
        required: true,
        where: req.query
      }],
      attributes: [
        [sequelize.fn("SUM", sequelize.col("student.sum")), "sum"],
        [sequelize.fn("SUM", sequelize.col("student.max_marks")), "max_marks"],
        "class_code",
        "SI."+group
      ],
      where: {
        class_code: {
          $ne: null
        }
      },
      group: ["class_code", "SI."+group]
    }),
    studentQuery({
      raw: true,
      include: [{
        model: models.school_info,
        as: "SI",
        attributes: [],
        required: true,
        where: req.query
      }],
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("student.grade")), "count"],
        "grade",
        "SI."+group
      ],
      where: {
        grade: {
          $ne: null
        }
      },
      group: ["grade", "SI."+group]
    })
  ]).then(function (data) {
    let response = {
      gradePie: data[0],
      subjectStack: data[1],
      classStack: data[2],
      gradeStack: data[3],
    };
    log.info(response);
    res.json({"message": "Data", "result": response, "error": false});
  }).catch(function (err) {
    log.error(err);
    res.status(500).json({"message": "err", "err": err, "error": true});
  });
};


