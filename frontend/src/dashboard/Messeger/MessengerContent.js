import { styled } from "@mui/system";
import { useEffect } from "react";
import NewMessageInput from "./NewMessageInput";
import Message from "./Messages/Message";
import { getDirectChatHistory } from "../../Real-time/socketCommunication";
import Messseges from "./Messages/Messages";

const Wrapper = styled("div")({
    flexGrow:1,
})

const MessengerContent = ({chosenChatDetails}) => {

    useEffect(() => {
        getDirectChatHistory({
            receiverId : chosenChatDetails.id,
        });
    },[chosenChatDetails])
    return ( 
        <Wrapper>
            <Messseges />
            <NewMessageInput />
        </Wrapper>
     );
}
 
export default MessengerContent;