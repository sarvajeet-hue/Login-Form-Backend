const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema({
    username : {
        type : String,
        required :true
    },
    email : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    role : {
        type : String,
        enum : ["Admin" , "Student", "Visitor"]
    }

})


module.exports = mongoose.model("SignUp" , signUpSchema)