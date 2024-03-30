import { styled } from "@mui/system";
import Avatar from "../../../components/Avatar";
import { Typography } from "@mui/material";

const MainContainer = styled("div")({
    width : "97%",
    display : "flex",
    marginTop:"10px",
})

const AvatarContainer = styled("div")({
    width:"70px"
})

const MessageContainer = styled("div")({
    display: "flex",
    flexDirection:"column",
})

const MessageContent = styled("div")({
    color : "#DCDDDE"
})


const Message = ({content , username }) => {
    return (
        <MainContainer>
            <AvatarContainer>
                <Avatar username = {username} />
            </AvatarContainer>
            <MessageContainer>
                <Typography style={{fontSize : "18px" ,color:"gray"}}>
                    {username}{" "}
                </Typography>
                <MessageContent>
                    {content}
                </MessageContent>
            </MessageContainer>
        </MainContainer>
    )
}
 
export default Message;