const Task = require("../models/task");
const { createServices, isMatch } = require("../services/common/common");

exports.createTask= async (req,res)=>{
    try {
        const reqbody = req.body;
        const name=reqbody.taskName
        const taskName={
            taskName:name
        }
        console.log(name)
        const isTaskMatch=await isMatch(Task,taskName)
        
       
        if(isTaskMatch.length>0){
            res.json({
                error: "Task already exists"
            })
        }
        else{
            reqbody.user=req.user;
            reqbody.userId=req.id
           
            const taskData=await createServices(reqbody,Task)
                res.json({
                    data:taskData
                })
        }
        
    } catch (error) {
       console.log(error) 
    }
}

exports.filterByDate=async(req,res)=>{
   try {
    const {startingDate,endingDate}=req.body
   
   const result=await Task.find({
    createDate:{$gte:new Date(startingDate),$lte:new Date(endingDate)}
   })
    res.json({
        task:result
    })
   } catch (error) {
    
   }
}

exports.setStatus= async (req,res)=>{
    const {status,_id}=req.body;
    try {
       const result=await Task.findOneAndUpdate({_id},{status:status})
       res.json({
            task:result
       })
    } catch (error) {
        
    }
}

exports.removeTask=async(req,res)=>{
   try {
    await Task.findByIdAndDelete(req.body)
    res.json({
        message: "Task removed"
    })
   } catch (error) {
    
   }
}