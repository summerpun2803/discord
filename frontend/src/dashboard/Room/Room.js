import { styled } from '@mui/system';
import { useState } from 'react';
import RoomResizeButton from './RoomResizeButton';
import VideoContainer from './VideoContainer';
import RoomButtons from './RoomButtons/RoomButton';

const MainContainer = styled("div")(({ isRoomMinimized }) => ({
    position: "absolute",
    borderRadius: "8px",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#202225',
    ...(isRoomMinimized ? {
        bottom: '0px',
        right: '0px',
        width: '30%',
        height: '40vh',
    } : {
        width: '100%',
        height: '100vh',
    })
}));

const Room = () => {
    const [isRoomMinimized, setIsRoomMinimized] = useState(true);

    const roomResizeHandler = () => {
        setIsRoomMinimized(!isRoomMinimized);
    }

    return (
        <MainContainer isRoomMinimized={isRoomMinimized} >
            <VideoContainer />
            <RoomButtons/>
            <RoomResizeButton isRoomMinimized={ isRoomMinimized} handleRoomResize={roomResizeHandler} />
        </MainContainer>
    );
}

export default Room;