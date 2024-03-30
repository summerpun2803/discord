import { styled } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";
import { sendMessage } from "../../Real-time/socketCommunication";


const MainContainer = styled("div")({
    height: "60px",
    width : "100%",
    display : "flex",
    alignItems : "center",
    justifyContent :"center",
})

const Input = styled("input")({
    backgroundColor : "#2f3136",
    width :"98%",
    height : '44px',
    color :"white",
    border : "none",
    borderRadius : "8px",
    fontSize : "14px",
    padding : "0 10px",
})
const NewMessageInput = () => {

    const [message , setMessage] = useState("");
    const chosenChatDetails = useSelector((state) => state.chat.chosenChatDetails);

    const handleValueChange = (e) => {
        setMessage(e.target.value);
    }
    const handleKeyPressed = (e) => {
        if(e.key === "Enter" ){
            handleSendMessage();
        }
    }

    const handleSendMessage = () => {
        if(message.length > 0){
            sendMessage({
                receiverId : chosenChatDetails.id,
                content : message
            })
            setMessage("");
        }
        

    }
    return ( 
        <MainContainer>
            <Input placeholder="write message"
                value = {message}
                onChange = {handleValueChange}
                onKeyDown = {handleKeyPressed}
            />
        </MainContainer>
     );
}
 
export default NewMessageInput;