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


surveySchema.statics.completeStatusCount = function(group, where){
    console.log(
            {
                '$group': {
                    '_id': '$'+group,
                    'size': {
                        '$sum': 1
                    }
                }
            }
        );
    console.log(where);
    return new Promise (function(resolve, reject){
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': '$'+group,
                    // 'name': {'$first': '$names'},
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

surveySchema.statics.schoolTypeCount = function(where){
    return new Promise (function(resolve, reject){
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': '$[question(153)]',
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

surveySchema.statics.resourceCount = function(where, resource){
    return new Promise (function(resolve, reject){
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': '$'+resource,
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
