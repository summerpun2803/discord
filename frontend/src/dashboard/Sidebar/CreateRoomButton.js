import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add'
import { useDispatch, useSelector } from "react-redux";
import { createNewRoom } from "../../Real-time/roomHandler";

const CreateRoomButton = () => {
    const dispatch = useDispatch();

    const createNewRoomHandler = () => {
        createNewRoom({dispatch});
    }
    const userInRoom = useSelector(state => state.room.isUserInRoom)
    return ( 
        <Button
            onClick={createNewRoomHandler}
            disabled = {userInRoom}
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
            <AddIcon />
        </Button>
     );
}
 
export default CreateRoomButton;