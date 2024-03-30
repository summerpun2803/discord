const Conversation = require("../models/conversation");
const Message = require("../models/messageModel");
const { updateChat } = require("./updates/chats");


const directMessageHandler = async(socket , data) => {
    try{
        const { userId } = socket.user;

        const { receiverId , content } = data;

        const message = await Message.create({
            content : content,
            author : userId,
            date : new Date(),
            type : "DIRECT",
        })

        const conversation = await Conversation.findOne({
            participants : { $all : [userId , receiverId]},
        })
        if(conversation){
            conversation.messages.push(message._id);
            await conversation.save();

            updateChat(conversation._id);

        }else{
            const newConversation = await Conversation.create({
                messages : [message._id],
                participants :[userId , receiverId],
            })

            updateChat(newConversation._id);
        }
        // console.log("yed thik hai")

    }catch(err){
        console.log(err)
    }
}

module.exports = {directMessageHandler}