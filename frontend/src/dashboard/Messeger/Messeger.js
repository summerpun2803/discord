import {styled} from '@mui/system';
import { useSelector } from 'react-redux';
import WelcomeMessage from './WelcomeMessage';
import MessengerContent from './MessengerContent';

const MainContainer = styled('div')({
    flexGrow :1,
    backgroundColor: '#36393f',
    marginTop: '48px',
    display : 'flex',
})

const Messeger = () => {

    const chosenChatDetails = useSelector((state) => state.chat.chosenChatDetails);

    return ( 
        <MainContainer>
            {chosenChatDetails ? <MessengerContent chosenChatDetails = {chosenChatDetails} /> : <WelcomeMessage />}
        </MainContainer>
     );
}
 
export default Messeger;