const express = require("express");
const router = express.Router();
const Project = require('../models/project.model')
const { createUserJwt } = require("../utils/tokens")
const security=require("../utils/security")
const bcrypt = require("bcrypt")

router.post('/addNewProject',async(req,res,next)=>{
    try {
        const respond = await Project.create({
            name:req.body.name,
            description:req.body.description
        })
        console.log("new project added")
        return res.status(200).json({result: true})
    } catch (error) {
        res.status(500).send("Server Error");
    }
})

router.get('/fetchProjects',async(req,res,next)=>{
    try {
        const respond = await Project.find()
        console.log("project data fetched")
        return res.status(200).json({result: respond})
    } catch (error) {
        res.status(500).send("Server Error");
    }
})

module.exports = router;