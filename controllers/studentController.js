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
  console.log(req.query);
  let attributes = [];
  let group = '';
  let whereSchool = undefined;
  let whereStudent = {grade: {$ne: null}};
  let graph = req.query.graph;
  delete req.query.graph;
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
  } else if(req.query.summer_winter) {
    attributes = ['class_code'];
    group = 'class_code';
    whereSchool = req.query;
  } else if(req.query.class_code) {
    attributes = ['subject'];
    group = 'district';
    whereStudent['class_code'] = req.query.class_code;
  } else if(req.query.subject) {
    attributes = ['subject'];
    group = 'district';
    whereStudent['subject'] = req.query.subject;
  } else if(req.query.sex) {
    attributes = ['sex'];
    group = 'district';
    whereStudent['sex'] = req.query.sex;
  } else if(req.query.category) {
    attributes = ['category'];
    group = 'district';
    whereStudent['category'] = req.query.category;
  } else {
    attributes = ['district'];
    group = 'district';
  }

  let graphArray = [
    {
      raw: true,
      include: [{
        model: models.school,
        as: "SI",
        attributes: [],
        required: true,
        where: whereSchool
      }],
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("student.id")), "count"],
        "grade"
      ],
      where: whereStudent,
      group: "grade"
    },
   {
      raw: true,
      include: [{
        model: models.school,
        as: "SI",
        attributes: [],
        required: true,
        where: whereSchool
      }],
      attributes: [
        [sequelize.fn("SUM", sequelize.col("student.sum")), "sum"],
        [sequelize.fn("SUM", sequelize.col("student.max_marks")), "max_marks"],
        "subject",
        "SI."+group
      ],
      where: whereStudent,
      group: ["subject", "SI."+group]
    },
    {
      raw: true,
      include: [{
        model: models.school,
        as: "SI",
        attributes: [],
        required: true,
        where: whereSchool
      }],
      attributes: [
        [sequelize.fn("SUM", sequelize.col("student.sum")), "sum"],
        [sequelize.fn("SUM", sequelize.col("student.max_marks")), "max_marks"],
        "class_code",
        "SI."+group
      ],
      where: whereStudent,
      group: ["class_code", "SI."+group]
    },
    {
      raw: true,
      include: [{
        model: models.school,
        as: "SI",
        attributes: [],
        required: true,
        where: whereSchool
      }],
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("student.grade")), "count"],
        "grade",
        "SI."+group
      ],
      where: whereStudent,
      group: ["grade", "SI."+group]
    },
    {
      raw: true,
      include: [{
        model: models.school,
        as: "SI",
        attributes: [],
        required: true,
        where: whereSchool
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
      where: whereStudent,
      group: ["class_code", "SC.type"]
    },
    {
      raw: true,
      include: [{
        model: models.school,
        as: "SI",
        attributes: [],
        required: true,
        where: whereSchool
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
      where: whereStudent,
      group: ["SC.competency_category"]
    },
    {
      raw: true,
      include: [{
        model: models.school,
        as: "SI",
        attributes: [],
        required: true,
        where: whereSchool
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
      where: whereStudent,
      group: ["SI."+group]
    },
    {
      raw: true,
      include: [{
        model: models.school,
        as: "SI",
        attributes: [],
        required: true,
        where: whereSchool
      }, {
        model: models.student_competency,
        as: "SC",
        attributes: [],
        required: true,
        include: [{
        model: models.competency,
        as: "C",
        attributes: [],
        required: true
      }]
      }],
      attributes: [
        [sequelize.fn("SUM", sequelize.col("SC.success")), "success"],
        [sequelize.fn("COUNT", sequelize.col("student.id")), "total"],
        "SC.competency",
        "SC.C.competency_description"
      ],
      where: whereStudent,
      group: ["SC.competency"]
    },
    {
      raw: true,
      include: [{
        model: models.school,
        as: "SI",
        attributes: [],
        required: true,
        where: whereSchool
      }],
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("student.id")), "total"]
      ],
      where: whereStudent
    }];

  let responseArray = ['gradePie', 'subjectStack', 'classStack', 'gradeStack',
      'competencyType', 'competencyCategory', 'competencyDistribution',
      'competencyAnalysis', 'studentsAccessed'];
  log.info(typeof graphArray);
  log.info(graphArray.length);
  log.info(graph);
  Promise.all([studentQuery(graphArray[graph])]).then(function (data) {
    let response = {
      // gradePie: data[0],
      // subjectStack: data[1],
      // classStack: data[2],
      // gradeStack: data[3],
      // competencyType: data[4],
      // competencyCategory: data[5],
      // competencyDistribution: data[6],
      // competencyAnalysis: data[7],
      // studentsAccessed: data[8]
    };
    response[responseArray[graph]] = data[0];
    log.info(response);
    res.json({"message": "Data", "result": response, "error": false});
  }).catch(function (err) {
    log.error(err);
    res.status(500).json({"message": "err", "err": err, "error": true});
  });
};


