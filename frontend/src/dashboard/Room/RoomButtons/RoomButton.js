import { styled } from "@mui/system";
import CameraButton from "./CameraButton";
import MicButton from "./MicButton";
import CloseButton from "./CloseButton";
import ScreenShare from "@mui/icons-material/ScreenShare";
import ScreenShareButton from "./ScreenShare";

const MainContainer = styled("div")({
    height :"13%",
    width : "100%",
    backgroundColor : "#5865f2",
    borderTopLeftRadius : "8px",
    borderTopRightRadius : "8px",
    display: "flex",
    alignItems : "center",
    justifyContent : "center",
})

const RoomButtons = () => {
    return ( 
        <MainContainer>
            <CameraButton />
            <MicButton />
            <ScreenShareButton />
            <CloseButton />
        </MainContainer>
     );
}
 
export default RoomButtons;