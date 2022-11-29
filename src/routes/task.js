const express = require('express');
const { createTask, removeTask, filterByDate, setStatus } = require('../controllers/task');
const { requireSignIn } = require('../middlewar/authVerify');

const router=express.Router();

router.post('/createtask',requireSignIn,createTask)
router.post("/removeTask", requireSignIn,removeTask)
router.get("/filterByDate", requireSignIn,filterByDate)
router.post('/setStatus', requireSignIn,setStatus)



module.exports=router