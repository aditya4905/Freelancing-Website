const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const lancer = require("../Schema/lancer");
const client = require("../Schema/client");
const accepted = require("../Schema/accepted");
const project = require("../Schema/project");
router.post("/accept" ,async (req,res)=>{
//    let id = res.body.id;
    let p = await project.findOneAndDelete({_id : req.body.data.id});
    if(!p) return res.send({});
    let newproject = await new accepted({
        lancer_id : p.lancer_id,
        name : p.name,
        client_id : p.client_id,        
        date : p.date,
        description : p.description,
        cost : p.cost
    });
    console.log(newproject);
    newproject.save();
    let a = await client.findOneAndUpdate(
        {username : newproject.client_id},
        {$push : {project_ids : newproject._id}}
    );
    let b = await lancer.findOneAndUpdate(
        {username : newproject.lancer_id},
        {$push : {project_ids : newproject._id}}
    );
})
router.post('/fetchproject',async(req,res)=>{
    const response = await project.find({lancer_id : req.body.id});
    res.send({response});
    
})
router.post('/reject',async(req,res)=>{
    const p= await project.findOneAndDelete({_id : req.body.data.id});
    return ;
})
module.exports = router;