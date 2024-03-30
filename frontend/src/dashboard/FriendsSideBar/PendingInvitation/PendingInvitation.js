import { useSelector } from "react-redux";
import PendingInvitationListItem from "./PendingInvitationListItem";
import { styled } from "@mui/system";

const MainContainer = styled("div")({
    width: "100%",
    height: "22%",
    display : "flex",
    flexDirection: "column",
    alignItems : "center",
    overflow : "auto",
    
});


const PendingInvitationList = () => {

    const friend = useSelector((state) => state.friend);
    const friendInvitation = friend.pending_friend_req;
    // console.log("invitation" , friendInvitation);

    return ( 

        <MainContainer>
            {friendInvitation.map((invitation) => (
                <PendingInvitationListItem 
                    key = {invitation._id}
                    id = {invitation._id}
                    username = {invitation.senderId.username}
                    mail = {invitation.senderId.mail}
                />
            ))}
        </MainContainer>
     );
}
 
export default PendingInvitationList;