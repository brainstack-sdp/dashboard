"use strict";

let bunyan = require("bunyan");
let log = bunyan.createLogger({
  name: "dashboard",
  src: true,
  // streams: [
  //   {
  //     level: "info",
  //     stream: process.stdout            // log INFO and above to stdout
  //   },
  //   {
  //     level: "error",
  //     path: "/var/tmp/myapp-error.log"  // log ERROR and above to a file
  //   }
  // ]
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res
  }
});

module.exports = log;