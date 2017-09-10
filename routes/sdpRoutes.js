/**
 * User: himanshujain.2792
 * Time: 11:07 PM
 */

"use strict";

let express = require("express");
let router = express.Router();

let sdpController = require("../controllers/sdpController");
/**
 * GET "/"
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */

router.get("/", sdpController.analyticsSurvey);
router.get("/table", sdpController.table);

module.exports = router;
