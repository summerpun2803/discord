const jwt = require("jsonwebtoken");

const protect =(req,res,next) => {

    
    if(!req.cookies.User || !req.cookies.User.token) return res.status(402).send("no token , signin again");

    try{
        const token = req.cookies.User.token;
        const decoded = jwt.verify(token, process.env.KEY);
        if(!decoded){
            return res.status(402).send("fuck you");
        }
        console.log(decoded);
        req.user = decoded;
        next();


    }catch(err){
        console.log("error" , {err});
        return res.status(401).send("error",err);
    }
}

module.exports = protect;