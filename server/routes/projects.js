const express = require("express");
const router = express.Router();
const Project = require('../models/project.model')
const security=require("../utils/security")

router.post('/addNewProject',security.requireAuthorizedUser,async(req,res,next)=>{
    try {
        const respond = await Project.create({
            name:req.body.name,
            description:req.body.description
        })
        return res.status(200).json({result: true})
    } catch (error) {
        res.status(500).send("Server Error");
    }
})

router.get('/fetchProjects',security.requireAuthorizedUser,async(req,res,next)=>{
    try {
        const respond = await Project.find()
        return res.status(200).json({result: respond})
    } catch (error) {
        res.status(500).send("Server Error");
    }
})

module.exports = router;