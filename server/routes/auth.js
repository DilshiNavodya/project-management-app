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
        console.log("new user registered")
        return res.status(200).json({status: true})
    } catch (error) {
        console.log(error.message)
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
            console.log("user logged in")
            const token = createUserJwt(user._id);
            return res.status(200).json({ status:true, token: token})
        } else {
            console.log("error")
            return res.status(200).json({ status:false})
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error");
    }
} )

router.get('/fetchUsers',async(req,res,next)=>{
    try {
        const respond = await User.find()
        console.log("user data fetched")
        return res.status(200).json({result: respond})
    } catch (error) {
        res.status(500).send("Server Error");
    }
})

router.get('/getuser',security.requireAuthorizedUser,async(req,res,next)=>{
    console.log('get uid')
    const userid = res.locals.user.data;
    console.log(userid)
    return res.status(200).json({result: userid})
})

module.exports = router;