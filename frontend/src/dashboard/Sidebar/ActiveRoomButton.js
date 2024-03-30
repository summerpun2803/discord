import { Button, Tooltip } from "@mui/material";
import Avatar from "../../components/Avatar";
import { joinRoom } from "../../Real-time/roomHandler";
import { useDispatch } from "react-redux";

const ActiveRoomButton = ({
    creatorUsername,
    roomId,
    amountOfParticipants,
    isUserInRoom,
}) => {
    console.log(creatorUsername);
    const dispatch = useDispatch()
    const handleJoinActiveRoom = () => {
        joinRoom(roomId , dispatch);
    }
    const activeRoomButtonDisabled = amountOfParticipants > 3 || isUserInRoom;
    const roomTitle = `Creator ${creatorUsername} Connected: ${amountOfParticipants}`

    return ( 
        <Tooltip title = {roomTitle}>
            <div>
                <Button disabled ={activeRoomButtonDisabled} 
                    onClick={handleJoinActiveRoom}
                    style ={{
                        width: '48px',
                        height:'48px',
                        borderRadius:'16px',
                        margin:'0',
                        padding: '0',
                        minWidth:'0',
                        marginTop: '10px',
                        color: 'white',
                        backgroundColor: '#5865F2',
                    }}
                >
                    <Avatar username = {creatorUsername} />
                </Button>
            </div>
        </Tooltip>
     );
}
 
export default ActiveRoomButton;