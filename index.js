const express=require("express");
const { readdirSync } = require("fs");
const {dbConnect} = require("./src/dbConnect/dbConnect");
const app=express()



//middlewar
app.use(express.json())

app.get('/',(req,res)=>{
    res.json({
        message:"server successfully run"
    })
})
//connect mongoose
url="mongodb://127.0.0.1:27017"
dbConnect(url)



//routes

readdirSync("./src/routes").map(r => app.use("/api/v1", require(`./src/routes/${r}`)))


//listen port
const port=process.env.PORT || 4000

app.listen(port,()=>{
    console.log("connection success on port " + port)
})