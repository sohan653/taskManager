const mongoose=require('mongoose');

const TaskSchema=mongoose.Schema({
    taskName:String,
    description:String,
    createDate:{
        type:Date,
        default:new Date()
    },
    status:{
        type:String,
        enum:["new","processing","finished","cancelled"],
        default: "new"
    },
    user:String,
    userId:String,
    upDateTime:Date
},{versionKey:false})

const Task=mongoose.model('Task',TaskSchema)

module.exports=Task;