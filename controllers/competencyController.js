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
let log = require("../helpers/logger");
let responseArray = ['competencyType', 'competencyCategory', 'competencyDistribution',
    'competencyAnalysis', 'competencyAnalysis'];


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

exports.studentCompetencyQuery = studentCompetencyQuery;

module.exports.competency = function (req, res) {
  let group = '';
  let graph = req.query.graph;
  delete req.query.graph;
  let whereStudent = req.query;
  if(req.query.district) {
    group = 'block';
  } else if(req.query.block) {
    group = 'cluster';
  } else if(req.query.cluster) {
    group = 'school_name';
  } else if(req.query.school_name) {
    group = 'summer_winter';
  } else if(req.query.summer_winter) {
    group = 'class_code';
  } else{
    group = 'district';
  }
  if(graph==3 || graph==1){
    whereStudent['in_final'] = 1;
  }
  if(graph==1){
    whereStudent['competency_category'] = {
      $and: [{
          $notLike: '?'
        }, {
          $ne: null
        }]
      }
  };

  let graphArray = [{
      raw: true,
      include: [],
      attributes: [
        [sequelize.fn("SUM", sequelize.col("success")), "success"],
        [sequelize.fn("COUNT", sequelize.col("student_id")), "total"],
        "class_code",
        "type"
      ],
      where: whereStudent,
      group: ["class_code", "type"]
    }, {
      raw: true,
      include: [],
      attributes: [
        [sequelize.fn("SUM", sequelize.col("success")), "success"],
        [sequelize.fn("COUNT", sequelize.col("student_id")), "total"],
        "competency_category"
      ],
      where: whereStudent,
      group: ["competency_category"]
    }, {
      raw: true,
      include: [],
      attributes: [
        [sequelize.fn("SUM", sequelize.col("success")), "success"],
        [sequelize.fn("COUNT", sequelize.col("student_id")), "total"],
        group
      ],
      where: whereStudent,
      group: [group]
    }, {
      raw: true,
      include: [{
          model: models.competency,
          as: "C",
          attributes: [],
          required: true
        }],
      attributes: [
        [sequelize.fn("SUM", sequelize.col("success")), "success"],
        [sequelize.fn("COUNT", sequelize.col("student_id")), "total"],
        "competency",
        "C.competency_description"
      ],
      where: whereStudent,
      group: ["competency"]
    }, {
      raw: true,
      include: [{
        model: models.competency,
        as: "C",
        attributes: [],
        required: true,
      }],
      attributes: [
        [sequelize.fn("SUM", sequelize.col("success")), "success"],
        [sequelize.fn("COUNT", sequelize.col("student_id")), "total"],
        "competency",
        "C.competency_description"
      ],
      where: whereStudent,
      group: ["competency"]
    }];
  Promise.all([studentCompetencyQuery(graphArray[graph])]).then(function (data) {
    let response = {};
    response[responseArray[graph]] = data[0];
    res.json({"message": "Data", "result": response, "error": false});
  }).catch(function (err) {
    log.error(err);
    res.status(500).json({"message": "err", "err": err, "error": true});
  });
};


