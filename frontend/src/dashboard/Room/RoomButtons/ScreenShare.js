import { useState } from "react";
import { IconButton } from "@mui/material";
import ScreenShareIcon from '@mui/icons-material/ScreenShare'
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'


const ScreenShareButton = () => {
    const [isScreenSharingActive , setIsScreenSharingActive] = useState(true);

    const handleToggleScreenShare = () => {
        setIsScreenSharingActive(!isScreenSharingActive);
        console.log("prarara")
    }
    return ( 
        <IconButton onClick={handleToggleScreenShare} style ={{color : "white"}}>
            {isScreenSharingActive ? <ScreenShareIcon /> : <StopScreenShareIcon />}
        </IconButton>
     );
}
 
export default ScreenShareButton;