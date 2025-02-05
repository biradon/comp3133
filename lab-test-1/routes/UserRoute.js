const express = require('express');
const Model = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router()

module.exports = router;

const date = new Date();



// User signup
router.post(
    '/signup',
    // body('username', 'The minimum username length is 6 characters').isLength({min: 6}),
    // body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
    async (req, res) => {
        try {
            // const result = validationResult(req)
            // if(!result.isEmpty()) {
            //     return res.status(422).json({status: "false", errors: result.array()})
            // }
            console.log("Start to create data")
            // const {username, firstname} = req.body
            console.log("data here:")
            console.log(req.body.username)
            const data = new Model({
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: req.body.password,
            });
            console.log("Data created")
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword;
            await data.save();
            res.status(201).json({ message: 'User created successfully', user_id: data.id });
        } 
        catch (error) {
            res.status(500).json({ status: "false", message: 'Signup failed' });
        }
    });


router.post(
    '/login',
    body('username', 'Username does not empty').not().isEmpty(),
    body('password', 'Password does not empty').not().isEmpty(),
    async (req, res) => {
        try {
            const result = validationResult(req)
            if(!result.isEmpty()) {
                return res.status(422).json({status: "false", errors: result.array()})
            }
            const { username, password } = req.body;
            const user = await Model.findOne({username})
            if(!user) {
                return res.status(401).json({ status: "false", message: "Invalid username or password"});
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ status: "false", message: 'Invalid username or password' });
            }
            const token = jwt.sign({ userId: user._id }, 'Georgebrown753*', {
                expiresIn: '1h',
            });
            res.status(200).json({ message: 'Login successfull', token: token,});
        } 
        catch (error) {
            res.status(500).json({ status: "false", message: 'Login failed', error: error.message });
        }
    });



