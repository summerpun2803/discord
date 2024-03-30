import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/system";
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'

const MainContainer = styled("div")({
    position: "absolute",
    bottom : "10px",
    right: "10px",
})
const RoomResizeButton = ({isRoomMinimized , handleRoomResize}) => {
    return ( 
        <MainContainer>
            <IconButton style ={{color : "white"}} onClick={handleRoomResize}>
                {isRoomMinimized ? <OpenInFullIcon /> : <CloseFullscreenIcon />}
            </IconButton>
        </MainContainer>
     );
}
 
export default RoomResizeButton;