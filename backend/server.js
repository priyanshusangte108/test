const express = require("express")
const dbconnect = require("./config/dbconfig")
const errorHandler = require("./milldeware/errorHandler")
const app = express()
require("dotenv").config()

const port = process.env.PORT  || 5656

// connect database
dbconnect()

// body parser
app.use(express.json())
app.use(express.urlencoded({ extended : true}))


app.get("/", (req,res)=>{
    res.send("Welcome to api")
})

app.use("/api/todo", require("./routes/todoroute") )

//auth routes
app.use("/api/user",require("./routes/authroutes"))
 
//middleware
app.use(errorHandler);

//  starting the server
app.listen(port, ()=>{
    console.log(`Server is ready to start at PORT  : ${port}`)
})