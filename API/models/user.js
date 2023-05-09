

const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs= require('bcryptjs');
const jwt = require('jsonwebtoken');
// Define the user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
  });


  const User = mongoose.model('User', userSchema);
