const jwt=require("jsonwebtoken")

const SECRET_KEY = "secret_key";

const generateToken=(data)=>jwt.sign(data,SECRET_KEY,{expiresIn:"24h"})

const createUserJwt=(user)=>{
    const payload={
        data:user,
    }

    return generateToken(payload)
}

module.exports={
    generateToken,
    createUserJwt,
}