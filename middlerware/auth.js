
const jwt = require("jsonwebtoken")
require("dotenv").config();



exports.auth = (req, res, next) => {
    try {
        const { token } = req.body || req.Cookies || req.Header("Authorization").replace("Bearer ", "");
        console.log(req.Cookies)

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "token in empty"
            })
        }
        try {

            const payload = jwt.verify(token, process.env.JWT_SECRET)

            req.loginUser = payload
            
        }
        catch (error) {
            res.status(401).json({
                success : false, 
                message : "Token is invalid" 
            })
        }      
        next(); 
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "something is wrong while verifying the token"
        })
    }
}   

exports.isStudent = (req , res, next) =>{
    try{
        if(req.loginUser.role !== "Student" ){
            return res.status(400).json({
                success : false, 
                message : "THis is protected Route for student"
            })
        }
        next();
    }
    catch(error){
        res.status(400).json({
            success : false, 
            message : "user role is not matching"
        })
    }
}

exports.isAdmin = (req, res , next) =>{
    try{
        if(req.loginUser.role !== "Admin" ){
            return res.status(400).json({
                success : false, 
                message : "THis is protected Route for admin"
            })
        }
        next();
    }
    catch(error){
        res.status(400).json({
            success : false, 
            message : "user role is not matching"
        })
    }
}