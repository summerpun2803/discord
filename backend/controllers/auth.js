const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser')

const createtoken = (id , username) => {
    return jwt.sign({ data: {id , username} } , process.env.KEY , {expiresIn : '1d'});
}
const login = async(req,res)=> {
    if(!req.body) return res.status(400),send("enter something");
    const { password , mail } = req.body;

    try{
        const exsist = await User.findOne({mail});
        if(!exsist) return res.status(400).send("no such account");

        const username = exsist.username
        const match = await bcrypt.compare(password, exsist.password);
        if(match){
            const token = createtoken(exsist._id , username);
            res.cookie("User" , {token});
            res.status(200).json({ username, mail , token})
        }else{
            return res.status(401).send("incorrect password");
        }
    }catch(error){
        console.log(error);
        return res.status(401).send({error});
    }
}
 
const register = async (req,res)=> {
    if(!req.body) return res.status(400),send("enter something");
    const { username , password , mail } = req.body;

    try{
        const exsist = await User.findOne({mail});
        if(exsist) return res.status(400).send("email already in use");

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)
        const user = await User.create({username , mail , password : hash})

        const token = createtoken(user._id , username);
        res.cookie("User" , {token})
        res.status(200).json({username, mail , token})

    }catch(err){
        console.log(err);
        return res.status(401).send("error:" ,{err});
    }

        

}

exports.controller = {
    login,
    register
}