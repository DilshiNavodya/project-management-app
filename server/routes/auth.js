const express = require("express");
const router = express.Router();
const User = require('../models/user.model')
const { createUserJwt } = require("../utils/tokens")
const security=require("../utils/security")
const bcrypt = require("bcrypt")


router.post('/registerUser', async (req, res, next) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword= await bcrypt.hash(req.body.password, salt);
    try {
        const respond = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        })
        const token = createUserJwt(respond._id);
            return res.status(200).json({ status:true, token: token})
    } catch (error) {
        res.status(500).send("Server Error");
    }
} )

router.post('/loginUser', async (req, res, next) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        })
        if(user) {
            const token = createUserJwt(user._id);
            return res.status(200).json({ status:true, token: token})
        } else {
            return res.status(200).json({ status:false})
        }
    } catch (error) {
        res.status(500).send("Server Error");
    }
} )

router.get('/fetchUsers',security.requireAuthorizedUser,async(req,res,next)=>{
    try {
        const respond = await User.find()
        return res.status(200).json({result: respond})
    } catch (error) {
        res.status(500).send("Server Error");
    }
})

router.get('/getuser',security.requireAuthorizedUser,async(req,res,next)=>{
    const userid = res.locals.user.data;
    return res.status(200).json({result: userid})
})

module.exports = router;