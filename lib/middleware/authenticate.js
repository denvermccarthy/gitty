const jwt = require('jsonwebtoken');

async function authenticate(req, res, next) {
  try {
    const cookie = req.cookies[process.env.COOKIE_NAME];
    if (!cookie) throw new Error('Please Sign in.');

    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = user;

    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
}

module.exports = authenticate;
