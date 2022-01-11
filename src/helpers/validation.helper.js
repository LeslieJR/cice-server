const jwt = require('jsonwebtoken');
const config = require('../config');

const isTokenValid = async (req, res, next) => {
    try {
      const token = req.headers.token;
      if (!token) {
        return res.json({ err: "token does not exist" });
      }
      const data = jwt.verify(token, config.jwt.secret);
      console.log(JSON.stringify(data))
      req.body.data = data;
      if (!data) {
        return res.json({ err: "token does not exist" });
      }
      next();
    } catch (err) {
      return res.json({ err: err.message });
    }
  };

  module.exports={
      isTokenValid
  }