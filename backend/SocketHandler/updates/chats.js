const Conversation = require('../../models/conversation');
const { getSocketServerInstance, getActiveConnections } = require('../../serverStore');

const updateChat = async(conversationId , toSpecificSockedId = null) => {
    const conversation = await Conversation.findById(conversationId).populate({
        path : 'messages',
        model: 'Message',
        populate : {
            path :"author",
            model :'User',
            select : "username _id"
        }
    });

    if(conversation) {
        const io = getSocketServerInstance();
        console.log("sending///")
        if(toSpecificSockedId){
            return io.to(toSpecificSockedId).emit('direct-chat-history', {
                messages : conversation.messages,
                participants : conversation.participants,
            })
        }
        console.log(conversation);
        console.log("to al")
        conversation.participants.forEach(_id => {
            const activeConnection = getActiveConnections(_id.toString())

            activeConnection.forEach(socketId =>{
                io.to(socketId).emit('direct-chat-history' , {
                    messages : conversation.messages,
                    participants : conversation.participants,
                })
            }) 
        })
    }
}

module.exports = {updateChat};