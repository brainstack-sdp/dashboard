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
    "[question(343), option(10871)]" : String,
    "[question(343), option(10872)]" : String,
    "[question(343), option(10873)]" : String,
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



var SurveryModel = connApi.model('survey', surveySchema);

module.exports = SurveryModel;
