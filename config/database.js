const mongoose = require("mongoose");
require("dotenv").config()


exports.DBconnect = () => {
    mongoose.connect("mongodb+srv://krishnasingh296855925:DuDK0gZNqOjaFCrR@cluster0.jdz5tar.mongodb.net/authDatabase", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("DB connection succesfully")
    })
    .catch((error) => {
            console.log("kuch issue h")
            console.log(error)
        })
}
