import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import MessagesHeader from "./MessagesHeader";
import Message from "./Message";

const MainContainer = styled("div")({
    height: "calc(100% - 60px)",
    overflow : "auto",
    display: "flex",
    flexDirection: "column",
    alignItems : "left",
})
const Messseges = () => {

    const chat = useSelector((state) => state.chat);
    const {chosenChatDetails , messages} = chat;

    return ( 
        <MainContainer>
            <MessagesHeader name = {chosenChatDetails?.name} />
            {messages.map((message , index) => {
                return (
                    <div>
                        <Message
                            key = {index}
                            content={message.content}
                            username={message.author.username}
                        />
                    </div>
                )
            })}
        </MainContainer>
     );
}
 
export default Messseges;