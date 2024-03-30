import { styled } from "@mui/system";
import Video from "./Video";
import { getStreamGlobal } from "../../Real-time/roomHandler";
import { useSelector } from "react-redux";


const MainContainer = styled("div")({
    height: "87%",
    width : '100%',
    display: "flex",
    flexWrap : 'wrap',
})

const VideoContainer = () => {
    const localstream = getStreamGlobal();
    const remoteStreams = useSelector(state => state.room.remoteStreams);
    return ( 
        <MainContainer>
            <Video stream = {localstream} isLocalStream />
            {remoteStreams.map(stream => (
                <Video key={stream.id} stream = {stream} />
            ))}
        </MainContainer>
     );
}
 
export default VideoContainer;