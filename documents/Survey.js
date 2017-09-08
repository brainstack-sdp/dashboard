/**
 * User: himanshujain.2792
 * Date: 6/2/16
 * Time: 10:01 PM
 */


var mongoose = require('mongoose');


var surveySchema = new mongoose.Schema({
    status : String,
    SessionID : String,
    iLinkID : String,
    responseID : String,
    id:{ type: String, index: { unique: true}}, 
    "[question(343), option(10871)]" : String,
    "[question(343), option(10872)]" : String,
    "[question(343), option(10873)]" : String,
    "[question(343), option(10871)]" : { type: String,  index: true},
    "[question(343), option(10872)]" : { type: String,  index: true},
    "[question(343), option(10873)]" : { type: String,  index: true},
    "[question(153)]": { type: String,  index: true},
    "question(591)]": { type: String,  index: true},
    "[question(535)]": { type: String,  index: true},
    "[variable(537)]": { type: String,  index: true},
    "[variable(587)]": { type: String,  index: true},
    "[variable(540)]": { type: String,  index: true},
    "[variable(\"536-shown\")]": { type: String,  index: true},
    // "[question(343), option(10874)]" : String,

    // ideal_stay_time : String
}, {strict: false, collection: 'survey'});


surveySchema.statics.completeStatusCount = function(group, where, group_name, query){
 
    return new Promise (function(resolve, reject){
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': '$'+group,
                    [query]: {'$first': '$'+group_name},
                    'size': {
                        '$sum': 1
                    }
                }
            }
        ]).exec(function(err, data){

            if(err)
                reject(err);
            resolve(data);
        });
    }.bind(this));
    // return new Promise (function(resolve, reject){
    //     "use strict";
    //     this.find({}).exec(function(err, data){
    //         if(err)
    //             reject(err);
    //         resolve(data);
    //     });
    // }.bind(this));
};

surveySchema.statics.schoolTypeCount = function(where, group_name, query){
    return new Promise (function(resolve, reject){
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': '$[question(153)]',
                    [query]: {'$first': '$'+group_name},
                    'size': {
                        '$sum': 1
                    }
                }
            }
        ]).exec(function(err, data){
            if(err)
                reject(err);
            resolve(data);
        });
    }.bind(this));
};

surveySchema.statics.resourceCount = function(where, resource, group_name, query){
    return new Promise (function(resolve, reject){
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': '$'+resource,
                    [query]: {'$first': '$'+group_name},
                    'size': {
                        '$sum': 1
                    }
                }
            }
        ]).exec(function(err, data){
            if(err)
                reject(err);
            resolve(data);
        });
    }.bind(this));
};

surveySchema.statics.targetCount = function(where, resource, group_name, query){
    return new Promise (function(resolve, reject){
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': '$'+group_name,
                    "yes_count": { "$sum": {
                        "$cond": [ { $and : [
                            { $eq:['$[question(535)]', 'हाँ । Yes' ] },
                            { $eq:['$[question(537)]', 'हाँ । Yes' ] },
                            { $eq:['$[question(589)]', 'हाँ । Yes' ] },
                            { $eq:['$[question(540)]', 'हाँ । Yes' ] }
                          ] }, 1, 0 ]
                    } },
                    "no_count": { "$sum": {
                        "$cond": [ { $and : [
                            { $ne:['$[question(535)]', 'हाँ । Yes' ] },
                            { $ne:['$[question(537)]', 'हाँ । Yes' ] },
                            { $ne:['$[question(589)]', 'हाँ । Yes' ] },
                            { $ne:['$[question(540)]', 'हाँ । Yes' ] }
                          ] }, 1, 0 ]
                    } },
                    "partial_count": { "$sum": {
                        "$cond": [ { $or : [
                             { $eq:['$[question(535)]', 'हाँ । Yes' ] },
                            { $eq:['$[question(537)]', 'हाँ । Yes' ] },
                            { $eq:['$[question(589)]', 'हाँ । Yes' ] },
                            { $eq:['$[question(540)]', 'हाँ । Yes' ] }
                          ] }, 1, 0 ]
                    } },
                    // "noupdate_count": { "$sum": {
                    //     "$cond": [ { $and : [
                    //         { '[question(535)]': { $eq: "" } },
                    //         { '[question(537)]': { $eq: "" } },
                    //         { '[question(589)]': { $eq: "" } },
                    //         { '[question(540)]': { $eq: "" } }
                    //       ] }, 1, 0 ]
                    // } },
                }
            },
            { "$project": {
                "_id": 0,
                [query]: "$_id",
                "yes_count": 1,
                "no_count": 1,
                "partial_count": 1,
                // "noupdate_count": 1
            } }
        ]).exec(function(err, data){
            if(err)
                reject(err);
            resolve(data);
        });
    }.bind(this));
};

surveySchema.statics.targetStatusCount = function(where, resource, group_name, query){
    return new Promise (function(resolve, reject){
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': {
                        'st': '$[variable(535)]', 
                        'st': '$[variable(537)]', 
                        'st': '$[variable(589)]', 
                        'st': '$[variable(540)]'
                    },
                    "yes_count": { "$sum": {
                        "$cond": [ { $and : [
                            { $eq:['$[question(535)]', 'हाँ । Yes' ] },
                            { $eq:['$[question(537)]', 'हाँ । Yes' ] },
                            { $eq:['$[question(589)]', 'हाँ । Yes' ] },
                            { $eq:['$[question(540)]', 'हाँ । Yes' ] }
                          ] }, 1, 0 ]
                    } },
                    "no_count": { "$sum": {
                        "$cond": [ { $and : [
                            { $ne:['$[question(535)]', 'हाँ । Yes' ] },
                            { $ne:['$[question(537)]', 'हाँ । Yes' ] },
                            { $ne:['$[question(589)]', 'हाँ । Yes' ] },
                            { $ne:['$[question(540)]', 'हाँ । Yes' ] }
                          ] }, 1, 0 ]
                    } },
                    "partial_count": { "$sum": {
                        "$cond": [ { $or : [
                            { $eq:['$[question(535)]', 'हाँ । Yes' ] },
                            { $eq:['$[question(537)]', 'हाँ । Yes' ] },
                            { $eq:['$[question(589)]', 'हाँ । Yes' ] },
                            { $eq:['$[question(540)]', 'हाँ । Yes' ] }
                          ] }, 1, 0 ]
                    } },
                }
            },
            { "$project": {
                "_id": 0,
                'status': "$_id.st",
                "yes_count": 1,
                "no_count": 1,
                "partial_count": 1
            } }
        ]).exec(function(err, data){
            if(err)
                reject(err);
            resolve(data);
        });
    }.bind(this));
};

surveySchema.statics.targetStatus = function(where, resource, group_name, query){
    return new Promise (function(resolve, reject){
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': {
                        'st': '$[question(535)]',
                        'st': '$[variable(\"536-shown\")]'
                        // 'st': '$[question(536), option(12524)]'
                        
                    },
                    "yes_count": { "$sum": {
                        "$cond": [ { $eq:['$[question(535)]', 'हाँ । Yes' ] }, 1, 0 ]
                    } },
                    "no_count": { "$sum": {
                        "$cond": [ { $ne:['$[question(535)]', 'हाँ । Yes' ] }, 1, 0 ]
                    } },
                    "partial_count": { "$sum": {
                        "$cond": [ { $eq:['$[question(535)]', 'हाँ । Yes' ] }, 1, 0 ]
                    } },
                }
            },
            { "$project": {
                "_id": 0,
                'status': "$_id.st",
                "yes_count": 1,
                "no_count": 1,
                "partial_count": 1            
            } }
        ]).exec(function(err, data){
            if(err)
                reject(err);
            resolve(data);
        });
    }.bind(this));
};

let target_var = {
    '575_1': '[question(575), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '504_1': '[question(504), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '504_2': '[question(504), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]',
    '504_3': '[question(504), question_pipe(\"3\")]',
    '647_1': '[question(647), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '647-2': '[question(647), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]'   
}


surveySchema.statics.targetTypeCount = function(where, resource, group_name, query){
    return new Promise (function(resolve, reject){
        "use strict";
        this.aggregate([
            where,
            { $project: { [target_var['575_1']]: 1,
                          [target_var['647_1']]: 1, 
                          [target_var['647_2']]: 1, 
                          'cp_1': { $substr: [ "$"+target_var['504_1'], 0, 9 ] },
                          'cp_2': { $substr: [ "$"+target_var['504_2'], 0, 9 ] },
                          'cp_3': { $substr: [ "$"+target_var['504_3'], 0, 9 ] }
                      },
            },
            {
                '$group': {
                    "_id": null,
                    "learning_curve": { "$sum": {
                        "$cond": [ { [target_var['575_1']]: { "$ifNull": [ "$field", false ] } }, 1, 0 ]
                    } },
                    "others": { "$sum": {
                        "$cond": [ { $or : [{ [target_var['647_1']]: { "$ifNull": [ "$field", false ] } },
                                            { [target_var['647_2']]: { "$ifNull": [ "$field", false ] } }]}, 1, 0 ]
                    } },
                    "community_participation": { "$sum": {
                        "$cond": [ { $or : [{ $eq:['$cp_1', 'Community' ] }, 
                                            { $eq:['$cp_2', 'Community' ] }, 
                                            { $eq:['$cp_3', 'Community' ] }] 
                                        }, 1, 0 ]
                    } },
                    "teacher_performance": { "$sum": {
                        "$cond": [ { $or : [{ $eq:['$cp_1', 'Teacher P' ] }, 
                                            { $eq:['$cp_2', 'Teacher P' ] }, 
                                            { $eq:['$cp_3', 'Teacher P' ] }] 
                                        }, 1, 0 ]
                    } },
                    "school_management": { "$sum": {
                        "$cond": [ { $or : [{ $eq:['$cp_1', 'School Ma' ] }, 
                                            { $eq:['$cp_2', 'School Ma' ] }, 
                                            { $eq:['$cp_3', 'School Ma' ] },
                                            { $eq:['$cp_3', 'विद्यालय' ] }] 
                                        }, 1, 0 ]
                    } },        
                }
            },
            { "$project": {
                "_id": 0,
                "teacher_performance": 1,
                "community_participation": 1,
                "school_management": 1,
                "learning_curve": 1,
                "others": 1,
            } }
        ]).exec(function(err, data){
            if(err)
                reject(err);
            resolve(data);
        });
    }.bind(this));
};

var SurveryModel = connApi.model('survey', surveySchema);

module.exports = SurveryModel;
