const express = require("express")
const router = express.Router();


const { signupController, loginController } = require("../controller/signupcontroller")
const {auth , isStudent , isAdmin} = require("../middlerware/auth")

router.post('/signup', signupController)
router.post('/login', loginController)


router.get('/student', auth, isStudent, (req, res) => {
    res.status(200).json({
        success: false,
        message: "Welcome to the protected route in Student"
    })
})
router.get('/admin', auth, isAdmin, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the protected route in Admin"
    })
})


module.exports = router