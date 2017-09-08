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
let SurveyModel = require("../documents/Survey");

let resources = {
  '584': '[question(584), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]',
  '587': '[question(587), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]',
  '588': '[question(588), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]',
         
}
module.exports.home = function (req, res) {
    res.render('sdp_home');
  //if (sessionUtils.checkExists(req, res, "user")) {
  //    res.render('sdp_home');
  //} else {
  //  console.log("ind");
  //  res.redirect('/login');
  //}
};


module.exports.analyticsSurvey = function(req, res) {
    let group = '';
    let group_name = '';
    let query = ''
    let where = undefined;
    if(req.query.district) {
      query = 'block';
      group_name = '[question(343), option(10872)]';
      group = '[question(343), option(10872)]';
      where = {'$match': {'[question(343), option(10871)]': req.query.district }};
    } else if(req.query.block) {
      query = 'school_name';
      group_name = '[question(343), option(10873)]';
      group = '[question(343), option(10873)]';
      where = {'$match': {'[question(343), option(10872)]': req.query.block }};
    } else if(req.query.school_name) {
      query = 'summer_winter';
      group_name = '[[question(591)]';
      group = '[question(591)]';
      where = {'$match': {'[question(343), option(10873)]': req.query.school_name }};
    } else if(req.query.summer_winter) {
      query = 'school_type';
      group_name = '[question(153)]';
      group = '[question(153)]';
      where = {'$match': {'[question(591)]': req.query.summer_winter }};
    } else if(req.query.school_type) {
      query = 'school_name';
      group_name = '[question(591)]';
      group = '[question(591)]';
      where = {'$match': {'[question(153)]': req.query.school_type }};
    } else{
      query = 'district';
      group_name = '[question(343), option(10871)]';
      group = '[question(343), option(10871)]';
      where = {'$match': {'id': {'$exists': true}}}
    } 
    
    // if(req.query.summer_winter && whereSchool) {
    //   where['summer_winter'] = req.query.summer_winter;
    // } else if (req.query.summer_winter){
    //   where = {
    //     'summer_winter':req.query.summer_winter
    //   };
    // }
    Promise.all([
        SurveyModel.completeStatusCount(group, where, group_name, query),
        SurveyModel.schoolTypeCount(where, group_name, query),
        SurveyModel.resourceCount(where, resources[584], group_name, query),
        SurveyModel.resourceCount(where, resources[587], group_name, query),
        SurveyModel.resourceCount(where, resources[588], group_name, query),
        SurveyModel.targetCount(where, resources[588], group_name, query),
        SurveyModel.targetStatusCount(where, resources[588], group_name, query),
        SurveyModel.targetStatus(where, resources[588], group_name, query),
        SurveyModel.targetTypeCount(where, resources[588], group_name, query),
    ]).then(function(data) {
        var response = {
            complete: data[0],
            school_type: data[1],
            resource_584: data[2],
            resource_587: data[3],
            resource_588: data[4],
            target: data[5],
            target_status: data[6],
            status: data[7],
            target_type: data[8]
        };
        res.json({'message': 'Data', 'result':response, 'error': false});
    });
};
