/**
 * User: himanshujain.2792
 * Date: 5/25/16
 * Time: 11:16 PM
 */


const mongoose = require('mongoose');
/**
 * Connect to MongoDB.
 */


function onConnectionError (err) {
    console.log("Mongoose connection error"+err);

}

function onConnect () {
    console.log("Mongoose connection open to");

}

function onDisconnect () {
    console.log("Mongoose connection disconnected");
}

function registerEvents () {
    mongoose.connection.on("connected", onConnect);

    // If the connection throws an error
    mongoose.connection.on("error", onConnectionError);

    // When the connection is disconnected
    mongoose.connection.on("disconnected", onDisconnect);

    // If the Node process ends, close the Mongoose connection
    process.on("SIGINT", function () {
        mongoose.connection.close(function() {
            console.log("warn", "Mongoose connection disconnected through app termination");
            process.exit(0);
        });
    });
}

mongoose.Promise = Promise;

module.exports = function(app){
    registerEvents();
    connApi = mongoose.createConnection(process.env.MONGODB_API_URI || process.env.MONGOLAB_API_URI);
    
};

//const connWeb = mongoose.createConnection(app.get('MONGODB_WEB_URI') || app.get('MONGOLAB_WEB_URI'));
//const connApi = mongoose.createConnection(app.get('MONGODB_API_URI') || app.get('MONGOLAB_API_URI'));
////mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
//mongoose.connection.on('error', function() {
//    console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
//    process.exit(1);
//});

