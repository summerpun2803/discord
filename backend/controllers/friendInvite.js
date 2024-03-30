const User = require('../models/userModel')
const FriendInvitaion = require("../models/friendInvitation");
const { updateFriendPendingInvitation, updateFriends } = require('../SocketHandler/updates/friends');

const invite = async(req,res) => {
    const target = req.body.mail;
    // console.log(req.body);
    console.log(target);
    const userId = req.user.data.id;
    console.log(userId);
    try{
        const targetUser = await User.findOne({
            mail: target,
        })
        console.log("targetUser" ,targetUser)
        if(!targetUser) {
            console.log("hello")
            return res.status(405).send("No such Email");
        }
    
        const alreadySent = await FriendInvitaion.findOne({
            senderId :userId , 
            receiverId : targetUser._id,
        })
        console.log("alreadySent" ,alreadySent)
        if(alreadySent) return res.status(404).send("already sent");
    
        const alreadyFriend = targetUser.friends.find(
            (friendId) => friendId.toString() === userId.toString()
        );
        console.log("alreadyFriend" ,alreadyFriend)
    
        if(alreadyFriend) return res.status(404).send("already Friend");
    
        const newInvitation = await FriendInvitaion.create({
            senderId : userId,
            receiverId : targetUser._id,
        });
        console.log("newInvitation" ,newInvitation)

        updateFriendPendingInvitation(targetUser._id.toString());
    
        return res.status(200).json({
            message: "Invitation Sent",
            invitation: newInvitation,
        });
    }catch(error){
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
    
}

const reject = async(req , res) => {
    try{
        const { id } = req.body.id;
        const userId = req.user.data.id;
        console.log("---id---" , id);
        const inviationExists = await FriendInvitaion.exists({_id : id});
        if(inviationExists){
            await FriendInvitaion.findByIdAndDelete(id);
            console.log("deleted....")
        }

        updateFriendPendingInvitation(userId);
        return res.status(200).send("successfully rejected");
    }catch(error){
        console.log(error);
        return res.status(500).send("server error");
    }
}

const accept = async(req,res) => {
    try{
        const {id} = req.body.id;
        const userId = req.user.data.id;

        const invitation = await FriendInvitaion.findById(id);
        if(!invitation) return res.status(404).send("Error");
        
        const { senderId , receiverId} = invitation;

        const senderUser = await User.findById(senderId);
        senderUser.friends = [...senderUser.friends , receiverId];

        const receiverUser = await User.findById(receiverId);
        receiverUser.friends = [...receiverUser.friends , senderId];

        await senderUser.save();
        await receiverUser.save();

        await FriendInvitaion.findByIdAndDelete(id)

        updateFriendPendingInvitation(receiverId.toString());
        updateFriends(senderId.toString());
        updateFriends(receiverId.toString());
        return res.status(200).send("ADDED");


    }catch(err){
        console.log(err);
        return res.status(500).send("internal error");
    }
}

module.exports = {
    invite,
    reject,
    accept,
} 