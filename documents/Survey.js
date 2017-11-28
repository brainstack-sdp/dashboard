/* eslint-disable indent,quotes */
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
    '457_2': '[question(457), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]',
    '457_3': '[question(457), question_pipe(\"3\")]',
    '514_1': '[question(514), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '514_2': '[question(514), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]',

    '510_1': '[question(510), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '458_1': '[question(458), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '458_2': '[question(458), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]',
    '458_3': '[question(458), question_pipe(\"3\")]',
    '516_1': '[question(516), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '516_2': '[question(516), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]',

    '511_1': '[question(511), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '460_1': '[question(460), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '460_2': '[question(460), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]',
    '460_3': '[question(460), question_pipe(\"3\")]',
    '517_1': '[question(517), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '517_2': '[question(517), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]',

    '512_1': '[question(512), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '461_1': '[question(461), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '461_2': '[question(461), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]',
    '461_3': '[question(461), question_pipe(\"3\")]',
    '518_1': '[question(518), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '518_2': '[question(518), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]',

    '692_1': '[question(692)]',
    '694_1': '[question(694)]',
    '696_1': '[question(696)]',
    '698_1': '[question(698)]',
    '693_1': '[question(693), option(15664)]',
    '695_1': '[question(695), option(15668)]',
    '699_1': '[question(699), option(15676)]',
    '697_1': '[question(697), option(15672)]',
    '584_1': '[question(584), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]',
    '587_1': '[question(587), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]',
    '588_1': '[question(588), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]',
    '504_4': '[variable(504), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]',
    '504_5': '[variable(504), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]',
    '504_6': '[variable(504), question_pipe(\"3\")]'
};

var surveySchema = new mongoose.Schema({
    status: String,
    SessionID: String,
    iLinkID: String,
    responseID: String,
    id: {
        type: String,
        index: {
            unique: true
        }
    },
    "[question(343), option(10871)]": String,
    "[question(343), option(10872)]": String,
    "[question(343), option(10873)]": String,
    "[question(343), option(10871)]": {
        type: String,
        index: true
    },
    "[question(343), option(10872)]": {
        type: String,
        index: true
    },
    "[question(343), option(10873)]": {
        type: String,
        index: true
    },
    "[question(153)]": {
        type: String,
        index: true
    },
    "[question(591)]": {
        type: String,
        index: true
    },
    "[question(692)]": {
        type: String,
        index: true
    },
    "[variable(694)]": {
        type: String,
        index: true
    },
    "[variable(587)]": {
        type: String,
        index: true
    },
    "[variable(698)]": {
        type: String,
        index: true
    },
    "[variable(\"693-shown\")]": {
        type: String,
        index: true
    },
    '[question(575), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]': {
        type: String,
        index: true
    },
    '[question(504), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]': {
        type: String,
        index: true
    },
    '[question(504), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]': {
        type: String,
        index: true
    },
    '[question(504), question_pipe(\"3\")]': {
        type: String,
        index: true
    },
    '[question(647), question_pipe(\"यह संसाधन उपलब्ध है<br />\r\n(Already have these resources)\")]': {
        type: String,
        index: true
    },
    '[question(647), question_pipe(\"इन वाजिब संसाधनों की ज़रूरत होगी<br />\r\n(Need to procure these resources - reasonable estimate)\")]': {
        type: String,
        index: true
    },
    'cluster': {
        type: String
    }

    // "[question(343), option(10874)]" : String,

    // ideal_stay_time : String
}, {
    strict: false,
    collection: 'survey'
});

surveySchema.statics.completeStatusCount = function (group, where, group_name, query) {
    return new Promise(function (resolve, reject) {
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': `$${group}`,
                    [query]: {
                        '$first': `$${group_name}`
                    },
                    'size': {
                        '$sum': 1
                    }
                }
            }
        ]).exec(function (err, data) {
            if (err) {
                reject(err);
            }
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

surveySchema.statics.schoolTypeCount = function (where, group_name, query) {
    return new Promise(function (resolve, reject) {
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': {
                        'school_type': '$[question(153)]',
                        [query]: `$${group_name}`
                    },
                    'size': {
                        '$sum': 1
                    }
                }
            }
        ]).exec(function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    }.bind(this));
};

surveySchema.statics.resourceCount = function (where, resource, group_name, query) {
    return new Promise(function (resolve, reject) {
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': `$${resource}`,
                    [query]: {
                        '$first': `$${group_name}`
                    },
                    'size': {
                        '$sum': 1
                    }
                }
            }
        ]).exec(function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    }.bind(this));
};

surveySchema.statics.targetCount = function (where, resource, group_name, query) {
    // and
    return new Promise(function (resolve, reject) {
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': `$${group_name}`,
                    "yes_count": {
                        "$sum": {
                            "$cond": [{
                                $and: [{
                                    $eq: ['$[question(692)]', 'हाँ । Yes']
                                },
                                    {
                                        $eq: ['$[question(694)]', 'हाँ । Yes']
                                    },
                                    {
                                        $eq: ['$[question(696)]', 'हाँ । Yes']
                                    },
                                    {
                                        $eq: ['$[question(698)]', 'हाँ (Yes)']
                                    }
                                ]
                            }, 1, 0]
                        }
                    },
                    "no_count": {
                        "$sum": {
                            "$cond": [{
                                $and: [{
                                    $eq: ['$[question(692)]', 'न । No']
                                },
                                    {
                                        $eq: ['$[question(694)]', 'न । No']
                                    },
                                    {
                                        $eq: ['$[question(696)]', 'न । No']
                                    },
                                    {
                                        $eq: ['$[question(698)]', 'न (No)']
                                    }
                                ]
                            }, 1, 0]
                        }
                    },
                    "partial_count": {
                        "$sum": {
                            "$cond": [{
                                $or: [{
                                    $and: [{
                                        $eq: ['$[question(692)]', 'कुछ हद तक, हाँ  । Partially']
                                    },
                                        {
                                            $eq: ['$[question(694)]', 'कुछ हद तक, हाँ । Partially']
                                        },
                                        {
                                            $eq: ['$[question(696)]', 'कुछ हद तक, हाँ । Partially']
                                        },
                                        {
                                            $eq: ['$[question(698)]', 'कुछ हद तक, हाँ । Partially']
                                        }
                                    ]
                                }, {
                                    $or: [{
                                        $eq: ['$[question(692)]', 'हाँ । Yes']
                                    },
                                        {
                                            $eq: ['$[question(694)]', 'हाँ । Yes']
                                        },
                                        {
                                            $eq: ['$[question(696)]', 'हाँ । Yes']
                                        },
                                        {
                                            $eq: ['$[question(698)]', 'हाँ (Yes)']
                                        }
                                    ]
                                }]
                            }, 1, 0]
                        }
                    },
                    "not_updated_count": {
                        "$sum": {
                            "$cond": [{
                                $and: [{
                                    $eq: ['$[question(692)]', '']
                                },
                                    {
                                        $eq: ['$[question(694)]', '']
                                    },
                                    {
                                        $eq: ['$[question(696)]', '']
                                    },
                                    {
                                        $eq: ['$[question(698)]', '']
                                    }
                                ]
                            }, 1, 0]
                        }
                    },
                    "total_count": {
                        "$sum": 1
                    }
                }
            },
            {
                "$project": {
                    "_id": 0,
                    [query]: "$_id",
                    "yes_count": 1,
                    "no_count": 1,
                    "partial_count": 1,
                    "not_updated_count": 1,
                    "total_count": 1
                    // "noupdate_count": 1
                }
            }
        ]).exec(function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    }.bind(this));
};

// OMPLIANCE WITH SA1 progress CHECK-IN
surveySchema.statics.targetProgressCount = function (where, resource, group_name, query) {
    // and
    return new Promise(function (resolve, reject) {
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': `$${group_name}`,
                    "yes_count": {
                        "$sum": {
                            "$cond": [{
                                $and: [
                                    {
                                        $or: [
                                            {
                                                $and: [
                                                    {$eq: ['$[variable(692)]', '15661']},
                                                    {$ne: ['$[question(693) option(15664)]', '']}
                                                ]
                                            },
                                            {$eq: ['$[variable(692)]', '15662']},
                                            {
                                                $and: [
                                                    {$eq: ['$[variable(692)]', '15663']},
                                                    {$ne: ['$[question(692) option(15664)]', '']}
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        $or: [
                                            {
                                                $and: [
                                                    {$eq: ['$[variable(694)]', '15665']},
                                                    {$ne: ['$[question(695) option(15668)]', '']}
                                                ]
                                            },
                                            {$eq: ['$[variable(694)]', '15666']},
                                            {
                                                $and: [
                                                    {$eq: ['$[variable(694)]', '15667']},
                                                    {$ne: ['$[question(695) option(15668)]', '']}
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        $or: [
                                            {
                                                $and: [
                                                    {$eq: ['$[variable(696)]', '15669']},
                                                    {$ne: ['$[question(697) option(15672)]', '']}
                                                ]
                                            },
                                            {$eq: ['$[variable(696)]', '15670']},
                                            {
                                                $and: [
                                                    {$eq: ['$[variable(696)]', '15671']},
                                                    {$ne: ['$[question(697) option(15672)]', '']}
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        $or: [
                                            {
                                                $and: [
                                                    {$eq: ['$[variable(698)]', '15673']},
                                                    {$ne: ['$[question(699) option(15676)]', '']}
                                                ]
                                            },
                                            {$eq: ['$[variable(699)]', '15674']},
                                            {
                                                $and: [
                                                    {$eq: ['$[variable(698)]', '15675']},
                                                    {$ne: ['$[question(699) option(15676)]', '']}
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }, 1, 0]
                        }
                    },
                    "total_count": { "$sum": 1 }
                }
            },
            {
                "$project": {
                    "_id": 0,
                    [query]: "$_id",
                    "yes_count": '$yes_count',
                    "no_count": 1,
                    "partial_count": 1,
                    "not_updated_count": 1,
                    "total_count": "$total_count"
                    // "noupdate_count": 1
                }
            }
        ]).exec(function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    }.bind(this));
};

/* surveySchema.statics.targetStatusCount = function (where, resource, group_name, query) {
    return new Promise(function (resolve, reject) {
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': {
                        'st': '$[variable(696)]',
                        'st': '$[variable(698)]'
                    },
                    "yes_count_696": {
                        "$sum": {
                            "$cond": [{
                                    $eq: ['$[question(696)]', 'हाँ । Yes']
                                },
                                1, 0
                            ]
                        }
                    },
                    "yes_count_698": {
                        "$sum": {
                            "$cond": [{
                                    $eq: ['$[question(698)]', 'हाँ (Yes)']
                                },
                                1, 0
                            ]
                        }
                    },

                    "no_count_696": {
                        "$sum": {
                            "$cond": [{
                                    $eq: ['$[question(696)]', 'न । No']
                                },
                                1, 0
                            ]
                        }
                    },
                    "no_count_698": {
                        "$sum": {
                            "$cond": [{
                                    $eq: ['$[question(698)]', 'न (No)']
                                },
                                1, 0
                            ]
                        }
                    },

                    "partial_count_696": {
                        "$sum": {
                            "$cond": [{
                                    $eq: ['$[question(696)]', 'कुछ हद तक, हाँ । Partially']
                                },
                                1, 0
                            ]
                        }
                    },
                    "partial_count_698": {
                        "$sum": {
                            "$cond": [{
                                    $eq: ['$[question(698)]', 'कुछ हद तक हाँ (Partially‌‌‌)']
                                },
                                1, 0
                            ]
                        }
                    },

                    "not_updated_count_696": {
                        "$sum": {
                            "$cond": [{
                                    $eq: ['$[question(696)]', '']
                                },
                                1, 0
                            ]
                        }
                    },
                    "not_updated_count_698": {
                        "$sum": {
                            "$cond": [{
                                    $eq: ['$[question(698)]', '']
                                },
                                1, 0
                            ]
                        }
                    },
                    "total_count": {
                        "$sum": 2
                    },
                }
            },
            {
                "$project": {
                    "_id": 0,
                    'status': "$_id.st",
                    "yes_count": {
                        '$add': ['$yes_count_696', '$yes_count_698']
                    },
                    "no_count": {
                        '$add': ['$no_count_696', '$no_count_698']
                    },
                    "partial_count": {
                        '$add': ['$partial_count_696', '$partial_count_698']
                    },
                    "not_updated_count": {
                        '$add': ['$not_updated_count_696', '$not_updated_count_698']
                    },
                    "total_count": 1
                }
            }
        ]).exec(function (err, data) {
            if (err)
                reject(err);
            resolve(data);
        });
    }.bind(this));
};*/

surveySchema.statics.targetStatusCount = function (where, resource, group_name, query) {
    return new Promise(function (resolve, reject) {
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': {
                        // 'st': '$[variable(696)]',
                        'st': '$[variable(698)]'
                    },
                    "yes_count_696": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[variable(698)]', '15673']
                            },
                                1, 0
                            ]
                        }
                    },
                    "no_count_696": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[variable(698)]', '15674']
                            },
                                1, 0
                            ]
                        }
                    },
                    "partial_count_696": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[variable(698)]', '15675']
                            },
                                1, 0
                            ]
                        }
                    },
                    "not_updated_count_696": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[variable(698)]', '']
                            },
                                1, 0
                            ]
                        }
                    },
                    "total_count": {
                        "$sum": 1
                    }
                }
            },
            {
                "$project": {
                    "_id": 0,
                    'status': "$_id.st",
                    "yes_count": '$yes_count_696',
                    "no_count": '$no_count_696',
                    "partial_count": '$partial_count_696',
                    "not_updated_count": '$not_updated_count_696',
                    "total_count": 1
                }
            }
        ]).exec(function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    }.bind(this));
};

surveySchema.statics.targetStatus504Count = function (where, resource, group_name, query) {
    return new Promise(function (resolve, reject) {
        "use strict";
        this.aggregate([
            where,
            // {
            //     $project: {
            //         '[variable(692)]': '$[variable(692)]',
            //         '[question(692)]': '$[question(692)]',
            //         '[variable(694)]': '$[variable(694)]',
            //         '[question(694)]': '$[question(694)]',
            //         // 'cp_1': { $substr: [ "$"+target_var['504_1'], 0, 6 ] },
            //         // 'cp_2': { $substr: [ "$"+target_var['504_2'], 0, 6 ] },
            //         // 'cp_3': { $substr: [ "$"+target_var['504_3'], 0, 6 ] },
            //         'cp': {
            //             $map: {
            //                 input: ["$" + target_var['504_1'], "$" + target_var['504_2'], "$" + target_var['504_3']],
            //                 as: "cp",
            //                 in: {
            //                     $substr: ["$$cp", 0, 6]
            //                 }
            //             }
            //         }

            //     },
            // },
            // {
            //     $unwind: "$cp"
            // },
            {
                '$group': {
                    '_id': {
                        'st': `$${target_var['504_5']}`, // tp
                        'st': `$${target_var['504_6']}`, // sm
                        'st': `$${target_var['504_4']}` // cp
                    },
                    "yes_count_692": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(692)]', 'हाँ । Yes']
                            },
                                1, 0
                            ]
                        }
                    },
                    "yes_count_694": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(694)]', 'हाँ । Yes']
                            },
                                1, 0
                            ]
                        }
                    },
                    /* "yes_count_696": {
                        "$sum": {
                            "$cond": [{
                                    $eq: ['$[question(696)]', 'हाँ । Yes']
                                },
                                1, 0
                            ]
                        }
                    },
                    "yes_count_698": {
                        "$sum": {
                            "$cond": [{
                                    $eq: ['$[question(698)]', 'हाँ (Yes)']
                                },
                                1, 0
                            ]
                        }
                    },*/
                    "no_count_692": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(692)]', 'न । No']
                            },
                                1, 0
                            ]
                        }
                    },
                    "no_count_694": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(694)]', 'न । No']
                            },
                                1, 0
                            ]
                        }
                    },
                    /* "no_count_696": {
                        "$sum": {
                            "$cond": [{
                                    $eq: ['$[question(696)]', 'न । No']
                                },
                                1, 0
                            ]
                        }
                    },
                    "no_count_698": {
                        "$sum": {
                            "$cond": [{
                                    $eq: ['$[question(698)]', 'न (No)']
                                },
                                1, 0
                            ]
                        }
                    },*/
                    "partial_count_692": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(692)]', 'कुछ हद तक, हाँ  । Partially']
                            },
                                1, 0
                            ]
                        }
                    },
                    "partial_count_694": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(694)]', 'कुछ हद तक, हाँ । Partially']
                            },
                                1, 0
                            ]
                        }
                    },
                    /* "partial_count_696": {
                        "$sum": {
                            "$cond": [{
                                    $eq: ['$[question(696)]', 'कुछ हद तक, हाँ । Partially']
                                },
                                1, 0
                            ]
                        }
                    },
                    "partial_count_698": {
                        "$sum": {
                            "$cond": [{
                                    $eq: ['$[question(698)]', 'कुछ हद तक हाँ (Partially‌‌‌)']
                                },
                                1, 0
                            ]
                        }
                    },*/
                    "not_updated_count_692": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(692)]', '']
                            },
                                1, 0
                            ]
                        }
                    },
                    "not_updated_count_694": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(694)]', '']
                            },
                                1, 0
                            ]
                        }
                    },
                    /* "not_updated_count_696": {
                        "$sum": {
                            "$cond": [{
                                    $eq: ['$[question(696)]', '']
                                },
                                1, 0
                            ]
                        }
                    },
                    "not_updated_count_698": {
                        "$sum": {
                            "$cond": [{
                                    $eq: ['$[question(698)]', '']
                                },
                                1, 0
                            ]
                        }
                    },
*/
                    "total_count": {
                        "$sum": 2
                    }
                }
            },
            {
                "$project": {
                    "_id": 0,
                    'status': "$_id.st",
                    'cp': 1,
                    "yes_count": {
                        '$add': ['$yes_count_692', '$yes_count_694', '$yes_count_696', '$yes_count_698']
                    },
                    "no_count": {
                        '$add': ['$no_count_692', '$no_count_694', '$no_count_696', '$no_count_698']
                    },
                    "partial_count": {
                        '$add': ['$partial_count_692', '$partial_count_694', '$partial_count_696', '$partial_count_698']
                    },
                    "not_updated_count": {
                        '$add': ['$not_updated_count_692', '$not_updated_count_694', '$not_updated_count_696', '$not_updated_count_698']
                    },
                    "total_count": 1
                }
            }
        ]).exec(function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    }.bind(this));
};

surveySchema.statics.targetStatus504_4Count = function (where, resource, group_name, query) {
    return new Promise(function (resolve, reject) {
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': {
                        'st': `$${target_var['504_4']}`
                        // 'st': '$[variable(692)]'
                    },
                    "yes_count_692": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[variable(692)]', '15661']
                            },
                                1, 0
                            ]
                        }
                    },
                    "no_count_692": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[variable(692)]', '15662']
                            },
                                1, 0
                            ]
                        }
                    },
                    "partial_count_692": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[variable(692)]', '15663']
                            },
                                1, 0
                            ]
                        }
                    },
                    "not_updated_count_692": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(692)]', '']
                            },
                                1, 0
                            ]
                        }
                    },

                    "total_count": {
                        "$sum": 1
                    }
                }
            },
            {
                "$project": {
                    "_id": 0,
                    'status': "$_id.st",
                    'cp': 1,
                    "yes_count": {
                        '$add': ['$yes_count_692']
                    },
                    "no_count": {
                        '$add': ['$no_count_692']
                    },
                    "partial_count": {
                        '$add': ['$partial_count_692']
                    },
                    "not_updated_count": {
                        '$add': ['$not_updated_count_692']
                    },
                    "total_count": 1
                }
            }
        ]).exec(function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    }.bind(this));
};

surveySchema.statics.targetStatus504_5Count = function (where, resource, group_name, query) {
    return new Promise(function (resolve, reject) {
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': {
                        'st': `$${target_var['504_5']}`
                        // 'st': '$[variable(694)]'
                    },
                    "yes_count_694": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[variable(694)]', '15665']
                            },
                                1, 0
                            ]
                        }
                    },
                    "no_count_694": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[variable(694)]', '15666']
                            },
                                1, 0
                            ]
                        }
                    },
                    "partial_count_694": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[variable(694)]', '15667']
                            },
                                1, 0
                            ]
                        }
                    },
                    "not_updated_count_694": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[variable(694)]', '']
                            },
                                1, 0
                            ]
                        }
                    },

                    "total_count": {
                        "$sum": 1
                    }
                }
            },
            {
                "$project": {
                    "_id": 0,
                    'status': "$_id.st",
                    'cp': 1,
                    "yes_count": {
                        '$add': ['$yes_count_694']
                    },
                    "no_count": {
                        '$add': ['$no_count_694']
                    },
                    "partial_count": {
                        '$add': ['$partial_count_694']
                    },
                    "not_updated_count": {
                        '$add': ['$not_updated_count_694']
                    },
                    "total_count": 1
                }
            }
        ]).exec(function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    }.bind(this));
};

/* surveySchema.statics.targetStatus504_6Count = function (where, resource, group_name, query) {
    return new Promise(function (resolve, reject) {
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': {
                        'st': '$'+target_var['504_6'],
                        //'st': '$[variable(547)]'

                    },
                    "yes_count_547": {
                        "$sum": {
                            "$cond": [{
                                    $eq: ['$[question(547)]', 'हाँ । Yes']
                                },
                                1, 0
                            ]
                        }
                    },
                    "no_count_547": {
                        "$sum": {
                            "$cond": [{
                                    $eq: ['$[question(547)]', 'न । No']
                                },
                                1, 0
                            ]
                        }
                    },
                    "partial_count_547": {
                        "$sum": {
                            "$cond": [{
                                    $eq: ['$[question(547)]', 'कुछ हद तक, हाँ । Partially']
                                },
                                1, 0
                            ]
                        }
                    },
                    "not_updated_count_547": {
                        "$sum": {
                            "$cond": [{
                                    $eq: ['$[question(547)]', '']
                                },
                                1, 0
                            ]
                        }
                    },

                    "total_count": {
                        "$sum": 1
                    },
                }
            },
            {
                "$project": {
                    "_id": 0,
                    'status': "$_id.st",
                    'cp': 1,
                    "yes_count": {
                        '$add': ['$yes_count_547']
                    },
                    "no_count": {
                        '$add': ['$no_count_547']
                    },
                    "partial_count": {
                        '$add': ['$partial_count_547']
                    },
                    "not_updated_count": {
                        '$add': ['$not_updated_count_547']
                    },
                    "total_count": 1
                }
            }
        ]).exec(function (err, data) {
            if (err)
                reject(err);
            resolve(data);
        });
    }.bind(this));
};*/

surveySchema.statics.targetStatus = function (where, resource, group_name, query) {
    return new Promise(function (resolve, reject) {
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': {
                        'st': '$[variable(696)]',
                        'st': '$[variable(549)]'
                        /* 'st': '$[question(696)]',
                        'st': '$[question(698)]',
                        'st': '$[question(549)]'*/
                        /* 'st': '$[variable(\"693-shown\")]',
                        'st': '$[variable(\"694-shown\")]',
                        'st': '$[variable(\"696-shown\")]',
                        'st': '$[variable(\"698-shown\")]',
                        'st': '$[variable(\"549-shown\")]'*/
                        // 'st': '$[question(693), option(15664)]'

                    },
                    "yes_count_696": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[variable(696)]', '15669']
                            },
                                1, 0
                            ]
                        }
                    },
                    "yes_count_549": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[variable(696)]', '15669']
                            },
                                1, 0
                            ]
                        }
                    },
                    "no_count_696": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[variable(696)]', '15670']
                            },
                                1, 0
                            ]
                        }
                    },
                    "no_count_549": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[variable(549)]', '15670']
                            },
                                1, 0
                            ]
                        }
                    },
                    "partial_count_696": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[variable(696)]', '15671']
                            },
                                1, 0
                            ]
                        }
                    },
                    "partial_count_549": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[variable(549)]', '15671']
                            },
                                1, 0
                            ]
                        }
                    },
                    "not_updated_count_696": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[variable(696)]', '']
                            },
                                1, 0
                            ]
                        }
                    },
                    "not_updated_count_549": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[variable(549)]', '']
                            },
                                1, 0
                            ]
                        }
                    }
                }
            },
            { "$project": {
                "_id": 0,
                'status': "$_id.st",
                "yes_count": {'$add': ['$yes_count_696', '$yes_count_549']},
                "no_count": {'$add': ['$no_count_696', '$no_count_549']},
                "partial_count": {'$add': ['$partial_count_696', '$partial_count_549']},
                "not_updated_count": {'$add': ['$not_updated_count_696', '$not_updated_count_549']},
                "total_count": 1

            } }
        ]).exec(function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    }.bind(this));
};

surveySchema.statics.targetTypeCount = function (where, resource, group_name, query) {
    return new Promise(function (resolve, reject) {
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    "_id": null,
                    "learning_curve": {
                        "$sum": {
                            "$cond": [{
                                [target_var['575_1']]: {
                                    "$ifNull": ["$field", false]
                                }
                            }, 1, 0]
                        }
                    },
                    "others": {
                        "$sum": {
                            "$cond": [{
                                $and: [{
                                    [target_var['647_1']]: {
                                        "$ifNull": ["$field", false]
                                    }
                                },
                                    {
                                        [target_var['647_2']]: {
                                            "$ifNull": ["$field", false]
                                        }
                                    }
                                ]
                            }, 2, 0]
                        }
                    }
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "status": '$_id.st',
                    "learning_curve": 1,
                    "others": 1
                }
            }
        ]).exec(function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    }.bind(this));
};

surveySchema.statics.targetType504Count = function (where, resource, group_name, query) {
    return new Promise(function (resolve, reject) {
        "use strict";
        this.aggregate([
            where,
            {
                $project: {
                    [target_var['504_4']]: `$${target_var['504_4']}`,
                    [target_var['504_5']]: `$${target_var['504_5']}`,
                    [target_var['504_6']]: `$${target_var['504_6']}`,
                    'cp_1': `$${target_var['504_4']}`,
                    'cp_2': `$${target_var['504_5']}`,
                    'cp_3': `$${target_var['504_6']}`
                }
            },
            {
                '$group': {
                    "_id": {
                        'st': `$${target_var['504_4']}`,
                        'st': `$${target_var['504_5']}`,
                        'st': `$${target_var['504_6']}`
                    },
                    "community_participation": {
                        "$sum": {
                            "$cond": [{
                                $or: [
                                    { $setIsSubset: [ ['$cp_1'], ['11313', '11314', '11315', '11316' ] ] },
                                    { $setIsSubset: [ ['$cp_2'], ['11313', '11314', '11315', '11316' ] ] },
                                    { $setIsSubset: [ ['$cp_3'], ['11313', '11314', '11315', '11316' ] ] }
                                ]
                            }, 1, 0]
                        }
                    },
                    "teacher_performance": {
                        "$sum": {
                            "$cond": [{
                                $or: [
                                    { $setIsSubset: [ ['$cp_1'], ['11317', '11318', '11319' ] ] },
                                    { $setIsSubset: [ ['$cp_2'], ['11317', '11318', '11319' ] ] },
                                    { $setIsSubset: [ ['$cp_3'], ['11317', '11318', '11319' ] ] }
                                ]
                            }, 1, 0]
                        }
                    },
                    "school_management": {
                        "$sum": {
                            "$cond": [{
                                $or: [
                                    { $setIsSubset: [ ['$cp_1'], ['11320', '11321', '15171', '15172' ] ] },
                                    { $setIsSubset: [ ['$cp_2'], ['11320', '11321', '15171', '15172' ] ] },
                                    { $setIsSubset: [ ['$cp_3'], ['11320', '11321', '15171', '15172' ] ] }
                                ]
                            }, 1, 0]
                        }
                    }
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "status": '$_id.st',
                    "teacher_performance": 1,
                    "community_participation": 1,
                    "school_management": 1
                }
            }
        ]).exec(function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    }.bind(this));
};

surveySchema.statics.targetTotalCount = function (where, resource, group_name, query) {
    return new Promise(function (resolve, reject) {
        "use strict";
        this.aggregate([
            where,
            {
                '$group': {
                    '_id': `$${group_name}`,
                    "yes_count_692": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(692)]', 'हाँ । Yes']
                            },
                                1, 0
                            ]
                        }
                    },
                    "yes_count_with_proof_692": {
                        "$sum": {
                            "$cond": [{
                                "$and": [
                                    {$eq: ['$[question(692)]', 'हाँ । Yes']},
                                    {$ne: [`$${target_var['693_1']}`, '']}
                                ]}, 1, 0
                            ]
                        }
                    },
                    "yes_count_694": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(694)]', 'हाँ । Yes']
                            },
                                1, 0
                            ]
                        }
                    },
                    "yes_count_with_proof_694": {
                        "$sum": {
                            "$cond": [{
                                "$and": [
                                    {$eq: ['$[question(694)]', 'हाँ । Yes']},
                                    {$ne: [`$${target_var['695_1']}`, '']}
                                ]}, 1, 0
                            ]
                        }
                    },
                    "yes_count_696": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(696)]', 'हाँ । Yes']
                            },
                                1, 0
                            ]
                        }
                    },
                    "yes_count_with_proof_696": {
                        "$sum": {
                            "$cond": [{
                                "$and": [
                                    {$eq: ['$[question(696)]', 'हाँ । Yes']},
                                    {$ne: [`$${target_var['697_1']}`, '']}
                                ]}, 1, 0
                            ]
                        }
                    },
                    "yes_count_549": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(549)]', 'हाँ । Yes']
                            },
                                1, 0
                            ]
                        }
                    },
                    "yes_count_with_proof_549": {
                        "$sum": {
                            "$cond": [{
                                "$and": [
                                    {$eq: ['$[question(549)]', 'हाँ । Yes']},
                                    {$ne: ['$[question(550), option(11381)]', '']}
                                ]}, 1, 0
                            ]
                        }
                    },

                    "yes_count_698": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(698)]', 'हाँ (Yes)']
                            },
                                1, 0
                            ]
                        }
                    },
                    "yes_count_with_proof_698": {
                        "$sum": {
                            "$cond": [{
                                "$and": [
                                    {$eq: ['$[question(698)]', 'हाँ । Yes']},
                                    {$ne: [`$${target_var['699_1']}`, '']}
                                ]}, 1, 0
                            ]
                        }
                    },

                    "no_count_692": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(692)]', 'न । No']
                            },
                                1, 0
                            ]
                        }
                    },
                    "no_count_694": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(694)]', 'न । No']
                            },
                                1, 0
                            ]
                        }
                    },
                    "no_count_696": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(696)]', 'न । No']
                            },
                                1, 0
                            ]
                        }
                    },
                    "no_count_549": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(549)]', 'न । No']
                            },
                                1, 0
                            ]
                        }
                    },
                    "no_count_698": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(698)]', 'न (No)']
                            },
                                1, 0
                            ]
                        }
                    },
                    "partial_count_692": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(692)]', 'कुछ हद तक, हाँ  । Partially']
                            },
                                1, 0
                            ]
                        }
                    },
                    "partial_count_with_proof_692": {
                        "$sum": {
                            "$cond": [{
                                "$and": [
                                    {$eq: ['$[question(692)]', 'कुछ हद तक, हाँ । Partially']},
                                    {$ne: [`$${target_var['693_1']}`, '']}
                                ]}, 1, 0
                            ]
                        }
                    },

                    "partial_count_694": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(694)]', 'कुछ हद तक, हाँ । Partially']
                            },
                                1, 0
                            ]
                        }
                    },
                    "partial_count_with_proof_694": {
                        "$sum": {
                            "$cond": [{
                                "$and": [
                                    {$eq: ['$[question(694)]', 'कुछ हद तक, हाँ । Partially']},
                                    {$ne: [`$${target_var['695_1']}`, '']}
                                ]}, 1, 0
                            ]
                        }
                    },

                    "partial_count_696": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(696)]', 'कुछ हद तक, हाँ । Partially']
                            },
                                1, 0
                            ]
                        }
                    },
                    "partial_count_with_proof_696": {
                        "$sum": {
                            "$cond": [{
                                "$and": [
                                    {$eq: ['$[question(696)]', 'कुछ हद तक, हाँ । Partially']},
                                    {$ne: [`$${target_var['697_1']}`, '']}
                                ]}, 1, 0
                            ]
                        }
                    },

                    "partial_count_549": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(549)]', 'कुछ हद तक, हाँ । Partially']
                            },
                                1, 0
                            ]
                        }
                    },
                    "partial_count_with_proof_549": {
                        "$sum": {
                            "$cond": [{
                                "$and": [
                                    {$eq: ['$[question(549)]', 'कुछ हद तक, हाँ । Partially']},
                                    {$ne: ['$[question(550), option(11381)]', '']}
                                ]}, 1, 0
                            ]
                        }
                    },

                    "partial_count_698": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(698)]', 'कुछ हद तक हाँ (Partially‌‌‌)']
                            },
                                1, 0
                            ]
                        }
                    },
                    "partial_count_with_proof_698": {
                        "$sum": {
                            "$cond": [{
                                "$and": [
                                    {$eq: ['$[question(698)]', 'कुछ हद तक, हाँ । Partially']},
                                    {$ne: [`$${target_var['698_1']}`, '']}
                                ]}, 1, 0
                            ]
                        }
                    },

                    "not_updated_count_692": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(692)]', ""]
                            },
                                1, 0
                            ]
                        }
                    },
                    "not_updated_count_694": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(694)]', ""]
                            },
                                1, 0
                            ]
                        }
                    },
                    "not_updated_count_696": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(696)]', ""]
                            },
                                1, 0
                            ]
                        }
                    },
                    "not_updated_count_549": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(549)]', ""]
                            },
                                1, 0
                            ]
                        }
                    },
                    "not_updated_count_698": {
                        "$sum": {
                            "$cond": [{
                                $eq: ['$[question(698)]', ""]
                            },
                                1, 0
                            ]
                        }
                    },
                    "total_count": {
                        "$sum": 5
                    }
                }
            },
            {
                "$project": {
                    "_id": 0,
                    [query]: "$_id",
                    "yes_count": {
                        '$add': ['$yes_count_692', '$yes_count_694', '$yes_count_696', '$yes_count_698']
                    },
                    "yes_count_with_proof": {
                        '$add': ['$yes_count_with_proof_692', '$yes_count_with_proof_694', '$yes_count_with_proof_696', '$yes_count_with_proof_698']
                    },
                    "no_count": {
                        '$add': ['$no_count_692', '$no_count_694', '$no_count_696', '$no_count_698']
                    },
                    "partial_count": {
                        '$add': ['$partial_count_692', '$partial_count_694', '$partial_count_696', '$partial_count_698']
                    },
                    "partial_count_with_proof": {
                        '$add': ['$partial_count_with_proof_692', '$partial_count_with_proof_694', '$partial_count_with_proof_696', '$partial_count_with_proof_698', '$partial_count_with_proof_549']
                    },
                    "not_updated_count": {
                        '$add': ['$not_updated_count_692', '$not_updated_count_694', '$not_updated_count_696', '$not_updated_count_698', '$not_updated_count_549']
                    },
                    "total_count": 1
                }
            }
        ]).exec(function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    }.bind(this));
};

surveySchema.statics.sdpTable = function (where) {
    return new Promise(function (resolve, reject) {
        "use strict";
        this.aggregate([where, {
            '$project': {
                // [query]: "$_id"
                'school': '$[question(343), option(10873)]',
                'target_type': {
                    $concat: [`$${target_var['575_1']}`, '* ', `$${target_var['504_1']}`, '* ', `$${target_var['504_2']}`, '* ', `$${target_var['504_3']}`, '* ', `$${target_var['647_1']}`, '* ', `$${target_var['647_2']}`]
                },
                'sa1': {
                    $concat: [`$${target_var['509_1']}`, '* ', `$${target_var['457_1']}`, '* ', `$${target_var['457_2']}`, '* ', `$${target_var['457_3']}`, '* ', `$${target_var['514_1']}`, '* ', `$${target_var['514_2']}`]
                },
                'sa2': {
                    $concat: [`$${target_var['510_1']}`, '* ', `$${target_var['458_1']}`, '* ', `$${target_var['458_2']}`, '* ', `$${target_var['458_3']}`, '* ', `$${target_var['516_1']}`, '* ', `$${target_var['516_2']}`]
                },
                'smc': {
                    $concat: [`$${target_var['511_1']}`, '* ', `$${target_var['460_1']}`, '* ', `$${target_var['460_2']}`, '* ', `$${target_var['460_3']}`, '* ', `$${target_var['517_1']}`, '* ', `$${target_var['517_2']}`]
                },
                'methods': {
                    $concat: [`$${target_var['512_1']}`, '* ', `$${target_var['461_1']}`, '* ', `$${target_var['461_2']}`, '* ', `$${target_var['461_3']}`, '* ', `$${target_var['518_1']}`, '* ', `$${target_var['518_2']}`]
                },
                'status': {
                    $concat: [
                        //  `$$target_var['698_1']}, '* ',
                        {
                            "$cond": [{
                                $and: [
                                    { $eq: [`$${target_var['698_1']}`, 'हाँ । Yes'] },
                                    { $ne: [`$${target_var['699_1']}`, ''] }
                                ]}, `$${target_var['699_1']}`, ''
                            ]
                        }, ' *',
                        //  `$${target_var['692_1']}`, '* ',
                        {
                            "$cond": [{
                                $and: [
                                    { $eq: [`$${target_var['692_1']}`, 'हाँ । Yes'] },
                                    { $ne: [`$${target_var['693_1']}`, ''] }
                                ]}, `$${target_var['693_1']}`, ''
                            ]
                        }, '* ',
                        //  `$${target_var['694_1']}`, '* ',
                        {
                            "$cond": [{
                                $and: [
                                    { $eq: [`$${target_var['694_1']}`, 'हाँ । Yes'] },
                                    { $ne: [`$${target_var['695_1']}`, ''] }
                                ]}, `$${target_var['695_1']}`, ''
                            ]
                        }, '* ',
                        'Not Updated', '* ',
                        // `$${target_var['696_1']}`, '* ',
                        {
                            "$cond": [{
                                $and: [
                                    { $eq: [`$${target_var['696_1']}`, 'हाँ । Yes'] },
                                    { $ne: [`$${target_var['697_1']}`, ''] }
                                ]}, `$${target_var['697_1']}`, ''
                            ]
                        }, '* ',
                        'Not Updated'
                    ]
                },
                // 'proof': {$concat:[ '$'+target_var['693_1'], ', ', '$'+target_var['695_1'], ', ', '$'+target_var['697_1'], ',', '$'+target_var['699_1']]},
                'requirememt': {
                    $concat: [`$${target_var['584_1']}`, '* ', `$${target_var['587_1']}`, '* ', `$${target_var['588_1']}`]
                },
                'cluster': '$cluster'
            }
        }
        ]).exec(function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    }.bind(this));
};

surveySchema.statics.sdpPdf = function (where) {
    return new Promise(function (resolve, reject) {
        "use strict";
        this.find([
            where

        ]).exec(function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    }.bind(this));
};
var SurveryModel = connApi.model('survey', surveySchema);

module.exports = SurveryModel;
