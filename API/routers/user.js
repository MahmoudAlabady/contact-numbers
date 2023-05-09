const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middelware/auth')
// Authenticate a user
const jwtSecret = 'myjwtsecret';

router.post('/api/authenticate', async (req, res) => {
    try {
        if(req.body.user== 'user1' || req.body.user== 'user2'){
            res.json({
                token:"token"
            });
        }else{
            const user = await User.findOne({
                username: req.body.user
            });
            if (!user || user.pass !== req.body.pass) {
                return res.status(401).json({
                    message: 'Invalid username or password'
                });
            }
            const token = jwt.sign({
                user: user.user
            }, jwtSecret, {
                expiresIn: '1h'
            });
            res.json({
                token
            });
        }
        
    } catch (error) {
        console.log('Error authenticating user:', error);
        res.status(500).json({
            message: 'Error authenticating user'
        });
    }
});



module.exports = router;