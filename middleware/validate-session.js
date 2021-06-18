require("dotenv").config;
const jwt = require("jsonwebtoken");
const {UserModel} = require('../models');

const validateSession = async (req, res, next) =>{
    // console.log(req.method == "OPTIONS");
    // console.log(req.headers.authorization);
    if(req.method === "OPTIONS"){
        next()
    }else if (req.headers.authorization){
        // console.log("test",req.headers.authorization)
        const {authorization} = req.headers;
        // console.log("authorization", authorization);
        const payload = authorization ? jwt.verify(authorization, process.env.JWT_SECRET) : undefined;
        // console.log("payload", payload);
        if(payload){
            let foundUser = await UserModel.findOne({
                where: {id: payload.id},
                message: req.body
            });
            
            if(foundUser){
                // console.log("request -->", req.body);
                req.user = foundUser;
                next()
            } else {
                res.status(400).send({
                    message: "Not authorized"
                })
            } 
        } else {
            res.status(401).send({
                message: "Invalid token"
            })
        }
    } else {
        res.status(403).send({
            message: "Forbidden"
        })
    }
}

module.exports = validateSession;