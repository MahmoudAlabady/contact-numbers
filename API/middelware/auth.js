const jwt = require('jsonwebtoken');
const User = require('../models/user')
// Create a middleware function to check for JWT authentication
const jwtSecret = 'myjwtsecret';

function auth(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }

  module.exports = auth;