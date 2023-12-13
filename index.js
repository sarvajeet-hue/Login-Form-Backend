const express = require("express");
const app = express();



app.use(express.json());


require("dotenv").config();

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const Router = require("./routes/router")


 app.use('/api/v1' , Router)

const {DBconnect} = require("./config/database")

DBconnect();

const port = process.env.PORT || 4000;



app.get('/',(req , res)=>{
    res.send(`<h1>This is Home Page</h1>`)
})

app.listen(port , () => {
    console.log(`server Started at port no .${port}`)
})