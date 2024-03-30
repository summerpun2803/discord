const test = (req,res)=> {
    res.send(req.user);
}

exports.controller = {
    test
};