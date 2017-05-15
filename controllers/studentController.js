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

let studentCompetencyQuery = function (queryObj) {
  return new Promise(function (resolve, reject) {
    models.student_competency.findAll(queryObj).then(function (data) {
      return resolve(data);
    }).catch(function (err) {
      log.error(err);
      return reject(err);
    });
  });
};

exports.studentQuery = studentQuery;

module.exports.student = function (req, res) {
  let attributes = [];
  let group = '';
  let where_school_info = undefined;
  let where_student = {grade: {$ne: null}};
  if(req.query.district) {
    attributes = ['block'];
    group = 'block';
    where_school_info = req.query;
  } else if(req.query.block) {
    attributes = ['cluster'];
    group = 'cluster';
    where_school_info = req.query;
  } else if(req.query.cluster) {
    attributes = ['school_name'];
    group = 'school_name';
    where_school_info = req.query;
  } else if(req.query.school_name) {
    attributes = ['summer_winter'];
    group = 'summer_winter';
    where_school_info = req.query;
  } else if(req.query.summer_winter) {
    attributes = ['class_code'];
    group = 'class_code';
    where_school_info = req.query;
  } else if(req.query.class_code) {
    attributes = ['subject'];
    group = 'district';
    where_student['class_code'] = req.query.class_code;
  } else if(req.query.subject) {
    attributes = ['subject'];
    group = 'district';
    where_student['subject'] = req.query.subject;
  } else if(req.query.sex) {
    attributes = ['sex'];
    group = 'district';
    where_student['sex'] = req.query.sex;
  } else if(req.query.category) {
    attributes = ['category'];
    group = 'district';
    where_student['category'] = req.query.category;
  } else {
    attributes = ['district'];
    group = 'district';
  }
  Promise.all([
    studentQuery({
      raw: true,
      include: [{
        model: models.school_info,
        as: "SI",
        attributes: [],
        required: true,
        where: where_school_info
      }],
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("student.id")), "count"],
        "grade"
      ],
      where: where_student,
      group: "grade"
    }),
    studentQuery({
      raw: true,
      include: [{
        model: models.school_info,
        as: "SI",
        attributes: [],
        required: true,
        where: where_school_info
      }],
      attributes: [
        [sequelize.fn("SUM", sequelize.col("student.sum")), "sum"],
        [sequelize.fn("SUM", sequelize.col("student.max_marks")), "max_marks"],
        "subject",
        "SI."+group
      ],
      where: where_student,
      group: ["subject", "SI."+group]
    }),
    studentQuery({
      raw: true,
      include: [{
        model: models.school_info,
        as: "SI",
        attributes: [],
        required: true,
        where: where_school_info
      }],
      attributes: [
        [sequelize.fn("SUM", sequelize.col("student.sum")), "sum"],
        [sequelize.fn("SUM", sequelize.col("student.max_marks")), "max_marks"],
        "class_code",
        "SI."+group
      ],
      where: where_student,
      group: ["class_code", "SI."+group]
    }),
    studentQuery({
      raw: true,
      include: [{
        model: models.school_info,
        as: "SI",
        attributes: [],
        required: true,
        where: where_school_info
      }],
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("student.grade")), "count"],
        "grade",
        "SI."+group
      ],
      where: where_student,
      group: ["grade", "SI."+group]
    }),
    studentQuery({
      raw: true,
      include: [{
        model: models.school_info,
        as: "SI",
        attributes: [],
        required: true,
        where: where_school_info
      }, {
        model: models.student_competency,
        as: "SC",
        attributes: [],
        required: true
      }],
      attributes: [
        [sequelize.fn("SUM", sequelize.col("SC.success")), "success"],
        [sequelize.fn("COUNT", sequelize.col("student.id")), "total"],
        "class_code",
        "SC.type"
      ],
      where: where_student,
      group: ["class_code", "SC.type"]
    }),
    studentQuery({
      raw: true,
      include: [{
        model: models.school_info,
        as: "SI",
        attributes: [],
        required: true,
        where: where_school_info
      }, {
        model: models.student_competency,
        as: "SC",
        attributes: [],
        required: true
      }],
      attributes: [
        [sequelize.fn("SUM", sequelize.col("SC.success")), "success"],
        [sequelize.fn("COUNT", sequelize.col("student.id")), "total"],
        "SC.competency_category"
      ],
      where: where_student,
      group: ["SC.competency_category"]
    }),
    studentQuery({
      raw: true,
      include: [{
        model: models.school_info,
        as: "SI",
        attributes: [],
        required: true,
        where: where_school_info
      }, {
        model: models.student_competency,
        as: "SC",
        attributes: [],
        required: true
      }],
      attributes: [
        [sequelize.fn("SUM", sequelize.col("SC.success")), "success"],
        [sequelize.fn("COUNT", sequelize.col("student.id")), "total"],
        "SI.district"
      ],
      where: where_student,
      group: ["SI.district"]
    }),
    studentQuery({
      raw: true,
      include: [{
        model: models.school_info,
        as: "SI",
        attributes: [],
        required: true,
        where: where_school_info
      }, {
        model: models.student_competency,
        as: "SC",
        attributes: [],
        required: true
      }],
      attributes: [
        [sequelize.fn("SUM", sequelize.col("SC.success")), "success"],
        [sequelize.fn("COUNT", sequelize.col("student.id")), "total"],
        "SC.competency"
      ],
      where: where_student,
      group: ["SC.competency"]
    })
  ]).then(function (data) {
    let response = {
      gradePie: data[0],
      subjectStack: data[1],
      classStack: data[2],
      gradeStack: data[3],
      competencyType: data[4],
      competencyCategory: data[5],
      competencyDistribution: data[6],
      competencyAnalysis: data[7]
    };
    log.info(response);
    res.json({"message": "Data", "result": response, "error": false});
  }).catch(function (err) {
    log.error(err);
    res.status(500).json({"message": "err", "err": err, "error": true});
  });
};


