const Conversation = require("../models/conversation");
const { updateChat } = require("./updates/chats");

const directChatHistoryHandler = async(socket , data) =>{
    try{

        const { userId } = socket.user;
        const { receiverId } = data;

        const conversation = await Conversation.findOne({
            participants : { $all : [userId , receiverId]}
        })
        console.log(userId , " " , receiverId)
        if(conversation){
            console.log("----------------so far so good--------------")
            
            updateChat(conversation._id.toString() , socket.id);
        }

    } catch(err){
        console.log(err);
    }
}
 
module.exports = {directChatHistoryHandler};