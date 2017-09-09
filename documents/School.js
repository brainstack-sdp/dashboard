/**
 * User: himanshujain.2792
 * Date: 6/2/16
 * Time: 10:01 PM
 */


var mongoose = require('mongoose');


var schoolSchema = new mongoose.Schema({
    district : String,
    block : String,
    school_name : String,
    label : String
}, {strict: false, collection: 'school'});


schoolSchema.statics.count = function(group, where, group_name, query){
 
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
};

schoolSchema.statics.schoolFilter = function(group, where, group_name, query){
 
    return new Promise (function(resolve, reject){
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': '$'+group,
                    [query]: {'$first': '$'+group_name},
                }
            }
        ]).exec(function(err, data){

            if(err)
                reject(err);
            resolve(data);
        });
    }.bind(this));
};
var SchoolModel = connApi.model('school', schoolSchema);

module.exports = SchoolModel;
