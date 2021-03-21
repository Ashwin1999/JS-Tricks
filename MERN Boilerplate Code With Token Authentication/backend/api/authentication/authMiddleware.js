const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const { cookies } = req;
  const token = JSON.parse(cookies.user).accessToken;
  console.log(`cur token:\t${token}`);
  if (!token) return res.status(401).json({ Error: "Access Denied" });
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.json({ message: err });
  }
};
