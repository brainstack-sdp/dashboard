/**
 * User: himanshujain.2792
 * Date: 5/23/16
 * Time: 11:13 PM
 */

exports._404 = function (req, res) {
  res.status(404).json({error: true, message: "Requested url Not Found"});
};

exports._500 = function (req, res) {
  res.status(500).json({error: true, message: "Internal server error"});
};
