import CheckIcon from'@mui/icons-material/Check';
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
const InvitationDecisionButton = ({disabled, acceptFriendInvitation, rejectFriendInvitation}) => {
    return ( 
        <Box sx= {{display: 'flex' ,}}>
            <IconButton style={{color: 'white'}} disabled = {disabled} onClick = {acceptFriendInvitation}/>
            <CheckIcon />

            <IconButton style={{color: 'white'}} disabled = {disabled} onClick={rejectFriendInvitation} />
            <ClearIcon />
        </Box>
     );
}
 
export default InvitationDecisionButton;