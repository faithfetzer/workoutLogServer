const Express = require('express');
const router = Express.Router();
const { UniqueConstraintError } = require('sequelize');
const {UserModel} = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

router.post("/register", async(req, res) => {
    let {username, password} = req.body.user;
    try{
        const User = await UserModel.create({
            username, 
            password: bcrypt.hashSync(password, 13),
        })
        let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
        res.status(201).json({
            message: "User successfully created",
            user: User,
            sessionToken: token
        })
    } catch (err) {
        if(err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Username already in use"
            })
        } else {
            res.status(500).json({
                message: "Failed to register user"
            })
        }
    }
});

router.post("/login", async (req, res) =>{
    let {username, password} = req.body.user;
    try {
        let loginUser = await UserModel.findOne({
            where: {
            username: username,
            },
        })
        
        if(loginUser){
            let passwordComparison = await bcrypt.compare(password, loginUser.password);
            if(passwordComparison){
            let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            res.status(200).json({
            message: `${loginUser.username} successfully logged in`,
            sessionToken: token
            })} else {
                res.status(401).json({
                    message: 'Login failed. Username or password incorrect'
                })
            }
        } else {
            res.status(401).json({
                message: 'Login failed. Username or password incorrect'
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({    
            message: "Failed to login user"
        })
    }
});

module.exports = router;