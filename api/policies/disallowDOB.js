/**
 * Created by naor on 12/7/15.
 */
module.exports = function (req, res, next) {

  if (req.body.dateOfBirth){
    res.forbidden();
  } else {
    next();
  }
};