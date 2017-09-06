/**
 * User: himanshujain.2792
 * Date: 10/13/16
 * Time: 11:07 PM
 */

"use strict";

let express = require("express");
let router = express.Router();

let schoolController = require("../controllers/schoolController");
let sdpController = require("../controllers/sdpController");
/**
 * GET "/"
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */
router.get("/", schoolController.index);
router.get("/sdp", sdpController.home);
router.get("/login", schoolController.login);

module.exports = router;
