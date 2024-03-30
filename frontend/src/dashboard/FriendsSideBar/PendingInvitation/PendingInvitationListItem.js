import { Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import Avatar from "../../../components/Avatar";
import InvitationDecisionButton from "./InivitationPendingButtons";
import { accept, reject } from "../../../api";

const PendingInvitationListItem = ({
    id,
    username,
    mail,
    
  }) => {
    const  [buttonDisabled , setButtonDisabled] = useState(false);


    const acceptFriendInvitation = async(id) => {
        const response = await accept({id});
        console.log("ruko jara",response);
    }

    const rejectFriendInvitation = async(id) => {
        const response = await reject({id});
        console.log("ruko jara",response);
    }


    const handleAcceptInvitation = () => {
        acceptFriendInvitation({id});
        setButtonDisabled(true);
    }

    const handleRejectInvitation = () => {
        rejectFriendInvitation({id});
        setButtonDisabled(true);
    }

    return ( 
        <Tooltip title = {mail}>
            <div style = {{width : "100%"}}>
                <Box
                    sx={{
                        width : "100%",
                        height: "42px",
                        marginTop: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent:"space-between",
                    }}
                >
                    <Avatar username={username} />
                    <Typography
                        sx= {{
                            marginLeft: "7px",
                            fontWeight: 700,
                            color: "#8e9297",
                            flexGrow: 1,
                        }}
                        variant="subtitle1"
                    >
                        {username}
                    </Typography>
                    <InvitationDecisionButton 
                        disabled={buttonDisabled}
                        acceptFriendInvitation = {handleAcceptInvitation}
                        rejectFriendInvitation = {handleRejectInvitation}
                    />
                </Box>
            </div>
        </Tooltip>
     );
}
 
export default PendingInvitationListItem;