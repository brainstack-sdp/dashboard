/**
 * User: himanshujain.2792
 * Date: 6/2/16
 * Time: 10:01 PM
 */

"use strict";
var mongoose = require('mongoose');
let target_var = {
    '575_1': '[question(575), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '504_1': '[question(504), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '504_2': '[question(504), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]',
    '504_3': '[question(504), question_pipe(\"3\")]',
    '647_1': '[question(647), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '647_2': '[question(647), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]',

    '509_1': '[question(509), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '457_1': '[question(457), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '514_1': '[question(514), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '510_1': '[question(510), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '458_1': '[question(458), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '516_1': '[question(516), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',

    '511_1': '[question(511), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '460_1': '[question(460), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '517_1': '[question(517), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '512_1': '[question(512), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '461_1': '[question(461), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '518_1': '[question(518), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '535_1': '[question(535)]',
    '537_1': '[question(537)]',
    '589_1': '[question(589)]',
    '540_1': '[question(540)]',
    '536_1': '[question(536), option(12524)]',
    '538_1': '[question(538), option(11364)]',
    '539_1': '[question(539), option(11365)]',
    '590_1': '[question(590), option(12240)]',
    '584_1': '[question(584), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]',
    '587_1': '[question(587), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]',
    '588_1': '[question(588), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]',
    '504_4': '[variable(504), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '504_5': '[variable(504), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]',
    '504_6': '[variable(504), question_pipe(\"3\")]'
}

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
    "[question(591)]": { type: String,  index: true},
    "[question(535)]": { type: String,  index: true},
    "[variable(537)]": { type: String,  index: true},
    "[variable(587)]": { type: String,  index: true},
    "[variable(540)]": { type: String,  index: true},
    "[variable(\"536-shown\")]": { type: String,  index: true},
    '[question(575), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]': { type: String,  index: true},
    '[question(504), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]': { type: String,  index: true},
    '[question(504), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]': { type: String,  index: true},
    '[question(504), question_pipe(\"3\")]': { type: String,  index: true},
    '[question(647), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]': { type: String,  index: true},
    '[question(647), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]': { type: String,  index: true},

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
    console.log({
                '$group': {
                    '_id': '$[question(153)]',
                    [query]: {'$first': '$'+group_name},
                    'size': {
                        '$sum': 1
                    }
                }
            });
    return new Promise (function(resolve, reject){
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': {
                        'school_type': '$[question(153)]',
                        [query]: '$'+group_name
                    },
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
    // and
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
                        "$cond": [ { $or: [{ $and : [
                            { $eq:['$[question(535)]', 'कुछ हद तक, हाँ । Partially' ] },
                            { $eq:['$[question(537)]', 'कुछ हद तक, हाँ । Partially' ] },
                            { $eq:['$[question(589)]', 'कुछ हद तक, हाँ । Partially' ] },
                            { $eq:['$[question(540)]', 'कुछ हद तक, हाँ । Partially' ] }
                          ] 
                        }, { $or : [
                            { $eq:['$[question(535)]', 'हाँ । Yes' ] },
                            { $eq:['$[question(537)]', 'हाँ । Yes' ] },
                            { $eq:['$[question(589)]', 'हाँ । Yes' ] },
                            { $eq:['$[question(540)]', 'हाँ । Yes' ] }
                          ] 
                        }]}, 1, 0 ]
                    } },
                    "not_updated_count": { "$sum": {
                        "$cond": [ { $and : [
                            { $eq:['$[question(535)]', '' ] },
                            { $eq:['$[question(537)]', '' ] },
                            { $eq:['$[question(589)]', '' ] },
                            { $eq:['$[question(540)]', '' ] }
                          ] }, 1, 0 ]
                    } },
                    "total_count": { "$sum": 1 },
                }
            },
            { "$project": {
                "_id": 0,
                [query]: "$_id",
                "yes_count": 1,
                "no_count": 1,
                "partial_count": 1,
                "not_updated_count": 1,
                "total_count": 1
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
    console.log(where);
    return new Promise (function(resolve, reject){
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': {
                        'st': '$[variable(589)]',
                        'st': '$[variable(540)]'
                    },
                    "yes_count_589": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(589)]', 'हाँ । Yes' ] },
                            1, 0 ]
                    } },
                    "yes_count_540": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(540)]', 'हाँ (Yes)' ] },
                            1, 0 ]
                    } },
                    
                    "no_count_589": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(589)]', 'न । No' ] },
                            1, 0 ]
                    } },
                    "no_count_540": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(540)]', 'न (No)' ] },
                            1, 0 ]
                    } },
                    
                    "partial_count_589": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(589)]', 'कुछ हद तक, हाँ । Partially' ] },
                            1, 0 ]
                    } },
                    "partial_count_540": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(540)]', 'कुछ हद तक हाँ (Partially‌‌‌)' ] },
                            1, 0 ]
                    } },
                    
                    "not_updated_count_589": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(589)]', '' ] },
                            1, 0 ]
                    } },
                    "not_updated_count_540": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(540)]', '' ] },
                             1, 0 ]
                    } },
                    "total_count": { "$sum": 2 },
                }
            },
            { "$project": {
                "_id": 0,
                'status': "$_id.st",
                "yes_count": { '$add' : [ '$yes_count_589', '$yes_count_540' ] },
                "no_count": { '$add' : [ '$no_count_589', '$no_count_540' ] },
                "partial_count": { '$add' : [ '$partial_count_589', '$partial_count_540'] },
                "not_updated_count": { '$add' : [ '$not_updated_count_589', '$not_updated_count_540' ] },
                "total_count": 1
            } }
        ]).exec(function(err, data){
            if(err)
                reject(err);
            resolve(data);
        });
    }.bind(this));
};

surveySchema.statics.targetStatus504Count = function(where, resource, group_name, query){
    return new Promise (function(resolve, reject){
        "use strict";
        this.aggregate([
            where,
            { $project: {
                          '[variable(535)]': '$[variable(535)]',
                          '[question(535)]': '$[question(535)]',
                          '[variable(537)]': '$[variable(537)]',
                          '[question(537)]': '$[question(537)]',
                          'cp_1': { $substr: [ "$"+target_var['504_1'], 0, 6 ] },
                          'cp_2': { $substr: [ "$"+target_var['504_2'], 0, 6 ] }
                      },
            },
            {
                '$group': {
                    '_id': {
                        'pc': '$cp_1',
                        'pc': '$cp_2',
                    },

                    "yes_count_535": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(535)]', 'हाँ । Yes' ] },
                            1, 0 ]
                    } },
                    "yes_count_537": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(537)]', 'हाँ । Yes' ] },
                            1, 0 ]
                    } },
                 
                    "no_count_535": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(535)]', 'न । No' ] },
                            1, 0 ]
                    } },
                    "no_count_537": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(537)]', 'न । No' ] },
                            1, 0 ]
                    } },
                   
                    "partial_count_535": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(535)]', 'कुछ हद तक, हाँ  । Partially' ] },
                            1, 0 ]
                    } },
                    "partial_count_537": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(537)]', 'कुछ हद तक, हाँ । Partially' ] },
                            1, 0 ]
                    } },
                    
                    "not_updated_count_535": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(535)]', '' ] },
                            1, 0 ]
                    } },
                    "not_updated_count_537": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(537)]', '' ] },
                            1, 0 ]
                    } },
                    
                    "total_count": { "$sum": 2 },
                }
            },
            { "$project": {
                "_id": 0,
                'pc': "$_id.pc",
                "yes_count": { '$add' : [ '$yes_count_535', '$yes_count_537' ] },
                "no_count": { '$add' : ['$no_count_535', '$no_count_537' ] },
                "partial_count": { '$add' : [ '$partial_count_535', '$partial_count_537'] },
                "not_updated_count": { '$add' : [ '$not_updated_count_535', '$not_updated_count_537' ] },
                
                "total_count": 1
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
                        "$cond": [ { $eq:['$[question(535)]', 'न । No' ] }, 1, 0 ]
                    } },
                    "partial_count": { "$sum": {
                        "$cond": [ 
                         { $or : [
                            { $eq:['$[question(535)]', 'कुछ हद तक, हाँ  । Partially'  ] },
                            { $eq:['$[question(535)]', 'हाँ । Yes' ] }
                          ] 
                        }, 1, 0 ]
                    } },
                    "not_updated_count": { "$sum": {
                        "$cond": [ { $eq:['$[question(535)]', '' ] }, 1, 0 ]
                    } },
                     "total_count": { "$sum": 1 },
                }
            },
            { "$project": {
                "_id": 0,
                'status': "$_id.st",
                "yes_count": 1,
                "no_count": 1,
                "partial_count": 1,
                "not_updated_count": 1,
                "total_count": 1
            } }
        ]).exec(function(err, data){
            if(err)
                reject(err);
            resolve(data);
        });
    }.bind(this));
};




surveySchema.statics.targetTypeCount = function(where, resource, group_name, query){
    return new Promise (function(resolve, reject){
        "use strict";
        this.aggregate([
            where,
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
                    }
                },
            { "$project": {
                "_id": 0,
                "status": '$_id.st',
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


surveySchema.statics.targetType504Count = function(where, resource, group_name, query){
    return new Promise (function(resolve, reject){
        "use strict";
        this.aggregate([
            where,
            { $project: {
                          [target_var['504_4']]: '$'+target_var['504_4'],
                          [target_var['504_5']]: '$'+target_var['504_5'],
                          [target_var['504_6']]: '$'+target_var['504_6'],
                          'cp_1': { $substr: [ "$"+target_var['504_1'], 0, 9 ] },
                          'cp_2': { $substr: [ "$"+target_var['504_2'], 0, 9 ] },
                          'cp_3': { $substr: [ "$"+target_var['504_3'], 0, 9 ] }
                      },
            },
            {
                '$group': {
                    "_id": {
                          'st': '$'+target_var['504_4'],
                          'st': '$'+target_var['504_5'],
                          'st': '$'+target_var['504_6']
                    },
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
                "status": '$_id.st',
                "teacher_performance": 1,
                "community_participation": 1,
                "school_management": 1
            } }
        ]).exec(function(err, data){
            if(err)
                reject(err);
            resolve(data);
        });
    }.bind(this));
};


surveySchema.statics.targetTotalCount = function(where, resource, group_name, query){
    return new Promise (function(resolve, reject){
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': '$'+group_name,
                    "yes_count_535": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(535)]', 'हाँ । Yes' ] },
                            1, 0 ]
                    } },
                    "yes_count_537": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(537)]', 'हाँ । Yes' ] },
                            1, 0 ]
                    } },
                    "yes_count_589": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(589)]', 'हाँ । Yes' ] },
                            1, 0 ]
                    } },
                    "yes_count_540": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(540)]', 'हाँ (Yes)' ] },
                            1, 0 ]
                    } },
                    "no_count_535": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(535)]', 'न । No' ] },
                            1, 0 ]
                    } },
                    "no_count_537": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(537)]', 'न । No' ] },
                            1, 0 ]
                    } },
                    "no_count_589": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(589)]', 'न । No' ] },
                            1, 0 ]
                    } },
                    "no_count_540": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(540)]', 'न (No)' ] },
                            1, 0 ]
                    } },
                    "partial_count_535": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(535)]', 'कुछ हद तक, हाँ  । Partially' ] },
                            1, 0 ]
                    } },
                    "partial_count_537": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(537)]', 'कुछ हद तक, हाँ । Partially' ] },
                            1, 0 ]
                    } },
                    "partial_count_589": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(589)]', 'कुछ हद तक, हाँ । Partially' ] },
                            1, 0 ]
                    } },
                    "partial_count_540": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(540)]', 'कुछ हद तक हाँ (Partially‌‌‌)' ] },
                            1, 0 ]
                    } },
                    "not_updated_count_535": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(535)]', '' ] },
                            1, 0 ]
                    } },
                    "not_updated_count_537": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(537)]', '' ] },
                            1, 0 ]
                    } },
                    "not_updated_count_589": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(589)]', '' ] },
                            1, 0 ]
                    } },
                    "not_updated_count_540": { "$sum": {
                        "$cond": [  
                            { $eq:['$[question(540)]', '' ] },
                             1, 0 ]
                    } },
                     "total_count": { "$sum": 4 },
                }
            },
            { "$project": {
                "_id": 0,
                [query]: "$_id",
                "yes_count": { '$add' : [ '$yes_count_535', '$yes_count_537', '$yes_count_589', '$yes_count_540' ] },
                "no_count": { '$add' : ['$no_count_535', '$no_count_537', '$no_count_589', '$no_count_540' ] },
                "partial_count": { '$add' : [ '$partial_count_535', '$partial_count_537', '$partial_count_589', '$partial_count_540'] },
                "not_updated_count": { '$add' : [ '$not_updated_count_535', '$not_updated_count_537', '$not_updated_count_589', '$not_updated_count_540' ] },
                "total_count": 1
            } }
        ]).exec(function(err, data){
            if(err)
                reject(err);
            resolve(data);
        });
    }.bind(this));
};


surveySchema.statics.sdpTable = function(where){
    return new Promise (function(resolve, reject){
        "use strict";
        this.aggregate([
            where,
            {
                '$project': {
                    // [query]: "$_id"
                    'school': '$[question(343), option(10873)]',
                    'target_type': {$concat:['$'+target_var['504_1'], '* ', '$'+target_var['504_2'], '* ', '$'+target_var['504_3']] },
                    'sa1': {$concat:[ '$'+target_var['509_1'], '* ', '$'+target_var['457_1'], '* ', '$'+target_var['514_1']]},
                    'sa2': {$concat:[ '$'+target_var['510_1'], '* ', '$'+target_var['458_1'], '* ', '$'+target_var['516_1']]},
                    'smc': {$concat:[ '$'+target_var['511_1'], '* ', '$'+target_var['460_1'], '* ', '$'+target_var['517_1']]},
                    'methods': {$concat:[ '$'+target_var['512_1'], '* ', '$'+target_var['461_1'], '* ', '$'+target_var['518_1']]},
                    'status': {$concat:[ '$'+target_var['535_1'], '* ', '$'+target_var['537_1'], '* ', '$'+target_var['589_1'], ',', '$'+target_var['540_1']]},
//                    'proof': {$concat:[ '$'+target_var['536_1'], ', ', '$'+target_var['538_1'], ', ', '$'+target_var['590_1'], ',', '$'+target_var['539_1']]},
                    'requirememt': {$concat:[ '$'+target_var['584_1'], '* ', '$'+target_var['587_1'], '* ', '$'+target_var['588_1']]},
                }
            }
        ]).exec(function(err, data){
            console.log(err);
            if(err)
                reject(err);
            resolve(data);
        });
    }.bind(this));
};


surveySchema.statics.sdpPdf = function(where){
    return new Promise (function(resolve, reject){
        "use strict";
        this.find([
            where,
           
        ]).exec(function(err, data){
            console.log(err);
            if(err)
                reject(err);
            resolve(data);
        });
    }.bind(this));
};
var SurveryModel = connApi.model('survey', surveySchema);

module.exports = SurveryModel;
