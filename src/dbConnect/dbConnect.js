const mongoose=require("mongoose")


const dbConnect=(url)=>{
    mongoose.connect(`${url}/task`).then(()=>console.log('successfully connected db')).catch(err=>console.log(err.message))
}

module.exports={dbConnect}