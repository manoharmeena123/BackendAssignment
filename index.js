 const express = require("express")
 const app = express()
 app.use(express.json())
 require("dotenv").config()
 const cookieParser =  require("cookie-parser");
 const session = require('express-session')
 app.use(cookieParser())
 app.use(session({
   secret: 'keyboard cat',
   resave: false,
   saveUninitialized: true,
   cookie: { secure: true }
 }))
const {connection} = require("./confige/confige")
const {UserModel} = require("./models/user.model")
const {authenticate} = require("./middleware/authenticate")
const {userRouter} = require("./routes/user.route")
const {authorise} = require("./middleware/authorise")
const {newtokenRouter} = require("./routes/newtoken")
const {communityRouter} = require("./routes/community.router")
const {memberRouter} = require("./routes/member.router")
const {roleRouter}= require("./routes/role.router")
app.get("/",(req,res)=>{
   console.log(req.cookies)
   res.json("Welcome")

})

app.use("/user",userRouter)

app.use(authenticate)
app.use("/coy",communityRouter)
app.use("/memb",memberRouter)
app.use("/role",roleRouter)          
    
 app.listen(process.env.port,async()=>{
    try {
       await connection 
    console.log("Connected to DB")
    } catch (error) {
      console.log(error)
    }
    console.log("Server on 4500")
 })