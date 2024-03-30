import {styled} from '@mui/system';
import AddFriendButton from './AddfriendButton';
import FriendsTitle from './FriendsTitle';
import FriendsList from './FriendsList/FriendsList';
import PendingInvitationList from './PendingInvitation/PendingInvitation';

const MainContainer = styled('div')({
    height : '100%',
    width: '224px',
    display : 'flex',
    flexDirection :'column',
    alignItems:'center',
    backgroundColor:'#2F3136'
})

const FriendsSideBar = () => {
    return ( 
        <MainContainer>
            <AddFriendButton />
            <FriendsTitle title = 'Private Messseges' />
            <FriendsList />
            <FriendsTitle title = 'Invitation' />
            <PendingInvitationList />

        </MainContainer>
     );
}
 
export default FriendsSideBar;