const SignUp = require("../model/signup")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.signupController = async (req, res) => {
    try {

        const { username, password, email, role } = req.body;

        const user = await SignUp.findOne({ email })
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exits"
            })
        }

        //secure password  
        let hashPassword;
        try {
            hashPassword = await bcrypt.hash(password, 10)
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "password nhi hua hash"
            })
        }


        const response = await SignUp.create({ username, password: hashPassword, email, role })


        res.status(200).json({
            success: true,
            resp: response,
            message: "Data store successfully"

        })
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: "create nhi hua h"
        })
    }


}


exports.loginController = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please Enter email and password"
            })
        }
        const loginUser = await SignUp.findOne({ email })

        if (!loginUser) {
            return res.status(400).json({
                success: false,
                message: "Email was not registered"
            })
        }
        const payload = {
            email: loginUser.email,
            role: loginUser.role,
            id: loginUser._id
        }

        if (await bcrypt.compare(password, loginUser.password)) {
            //create a token 
            let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" })
            loginUser.token = token
            loginUser.password = undefined

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                loginUser,
                message: "user logged in seccessfully"
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Password is Incorrect"
            })
        }



    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "login me issue hai "
        })
    }
}

