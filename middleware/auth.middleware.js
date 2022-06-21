const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

module.exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token === null) {
    res.locals.user === null;
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) {
      console.log(err);
      res.clearCookie("jwt");
      res.locals.user === null;
      return res.sendStatus(401);
    }
    res.locals.user = await UserModel.findById(user.id);
    // console.log("user in auth middleware", user);
    next();
  });
};

module.exports.requireToken = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("requireToken res.locals", res.locals);

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log("user decoded", user);
        next();
      }
    });
  } else {
    console.log("No token");
  }
};
