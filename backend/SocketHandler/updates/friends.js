const User = require("../../models/userModel");
const FriendInvitaion = require("../../models/friendInvitation");
const serverStore = require("../../serverStore")


const updateFriendPendingInvitation = async(userId) =>{
    try{
        const pendingInvitations = await FriendInvitaion.find({
            receiverId: userId
        }).populate('senderId' , '_id username mail');

        const recieverList = serverStore.getActiveConnections(userId);
        // console.log(userId , "id of the user");
        // console.log("List " ,recieverList )


        const io = serverStore.getSocketServerInstance();
        console.log("pending invitations ===>>>" , pendingInvitations)
        recieverList.forEach(receiverSocketId => {
            // console.log(receiverSocketId, "sent from backend");
            io.to(receiverSocketId).emit('friend-invitations', {
                pendingInvitations : pendingInvitations ? pendingInvitations : [],
            });
        })

    }catch(err){
        console.log(err);
    }
}

const updateFriends = async(userId) => {
    try{
        const recieverList = serverStore.getActiveConnections(userId);
        if(recieverList.length <= 0) return 

        const user = await User.findById(userId ,{_id:1 , friends:1}).populate(
            'friends',
            '_id username mail'
        );
        if(!user) return
        const friendList = user.friends.map((f)=> {
            return{
                id: f._id,
                mail: f.mail,
                username: f.username,
            }
        })
        

        const io = serverStore.getSocketServerInstance();

        recieverList.forEach(receiverSocketId => {
            console.log(receiverSocketId, "sent from backend");
            io.to(receiverSocketId).emit('friend-list', {
                friends : friendList ? friendList : [],
            });
        })

    }catch(err){
        console.log(err);
    }
}

module.exports = {
    updateFriendPendingInvitation,
    updateFriends,
}