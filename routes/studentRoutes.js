/**
 * User: himanshujain.2792
 * Date: 10/13/16
 * Time: 11:07 PM
 */

"use strict";

let express = require("express");
let router = express.Router();

let studentController = require("../controllers/studentController");
/**
 * GET "/"
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */

router.get("/", studentController.student);

module.exports = router;
