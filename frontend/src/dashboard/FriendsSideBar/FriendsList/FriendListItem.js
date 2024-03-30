import { Button, Typography } from "@mui/material";
import Avatar from "../../../components/Avatar";
import OnlineIndicator from "./OnlineIndication";
import { useDispatch } from "react-redux";
import { setChatDetails } from "../../../store/chatSlice";

const FriendListItem = ({id , username , isOnline}) => {
    const dispatch = useDispatch();

    const handleChosenConversation = () => {
        let chatDetails = {id:id, name: username};
        let chatType = "DIRECT";
        dispatch(setChatDetails( {chatDetails,chatType} ));
    }



    return ( 
        <Button
            onClick={handleChosenConversation}
            style = {{
                width: "100%",
                height: "42px",
                margin : "10px",
                display: "flex",
                alignItems:"center",
                justifyContent: "flex-start",
                textTransform: "none",
                color: "black",
                position: "relative",
            }}
        >
            <Avatar username = {username} />
            <Typography
                style= {{
                    marginLeft: '7px',
                    fontWeight: 700,
                    color : "#8e9297"
                }}
                variant = 'subtitle1'
                align= 'left'
            >
                {username}
            </Typography>
            {isOnline  && <OnlineIndicator/>}
        </Button>
     );
}
 
export default FriendListItem;