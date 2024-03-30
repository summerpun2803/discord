import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import FriendListItem from "./FriendListItem";

const MainContainer =styled('div')( {
    width: '100%',
    height: '22%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'auto',
})

const FriendsList = () => {

    const friend = useSelector((state) => state.friend);
    const friendList = friend.friends;
    const chat = useSelector((state) => state.chat);
    const dispatch = useDispatch();
    
    return ( 
        <MainContainer>
            {friendList.map((f)=>(
                <FriendListItem 
                    username = {f.username}
                    id = {f.id}
                    key = {f.id}
                    isOnline = {f.isOnline}
                />
            ))}
        </MainContainer>
     );
}
 
export default FriendsList;