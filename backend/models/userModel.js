const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    mail : {
        type: String ,
        unique : true,
        required : true
    },
    username : {
        type: String ,
        required : true
    },
    password : {
        type: String ,
        required : true
    },
    friends: [{
        type : Schema.Types.ObjectId,
        ref : "User",
    }]
})

module.exports = mongoose.model('User' , userSchema);