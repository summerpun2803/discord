import { IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch, useSelector } from 'react-redux';
import { leaveRoom } from '../../../Real-time/roomHandler';
const CloseButton = () => {
    const dispatch = useDispatch()
    const handleLeaveRoom = () => {
        leaveRoom(dispatch)
    }
    return ( 
        <IconButton onClick={handleLeaveRoom} style ={{color : "white"}}>
            <CloseIcon />
        </IconButton>
     );
}
 
export default CloseButton;