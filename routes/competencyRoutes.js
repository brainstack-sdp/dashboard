/**
 * User: himanshujain.2792
 * Date: 10/13/16
 * Time: 11:07 PM
 */

"use strict";

let express = require("express");
let router = express.Router();

let competencyController = require("../controllers/competencyController");
/**
 * GET "/"
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */

router.get("/", competencyController.competency);
router.get("/description", competencyController.description);

module.exports = router;
