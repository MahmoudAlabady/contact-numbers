const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middelware/auth')
// Authenticate a user
const jwtSecret = 'myjwtsecret';

router.post('/api/authenticate', async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        });
        if (!user || user.password !== req.body.password) {
            return res.status(401).json({
                message: 'Invalid username or password'
            });
        }
        const token = jwt.sign({
            username: user.username
        }, jwtSecret, {
            expiresIn: '1h'
        });
        res.json({
            token
        });
    } catch (error) {
        console.log('Error authenticating user:', error);
        res.status(500).json({
            message: 'Error authenticating user'
        });
    }
});



module.exports = router;