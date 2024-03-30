import React, { useEffect, useRef, useState } from 'react';
import {styled} from '@mui/system';
import SideBar from './Sidebar/Sidebar';
import FriendsSideBar from './FriendsSideBar/FriendsSideBar';
import Messeger from './Messeger/Messeger';
import AppBar from './AppBar/AppBar';
import { useDispatch, useSelector } from 'react-redux';
import {connectWithSocket , disconnect} from '../Real-time/socketCommunication';
import { test } from '../api';
import { loginSuccess } from '../store/authSlice';
import Room from './Room/Room';

const Wrapper = styled('div')({
    width : '100%',
    height : '100vh',
    display: 'flex',
});



const Dashboard = () => {
    const dispatch = useDispatch();
    // const [isSocketConnected, setIsSocketConnected] = useState(false);
    // const socketRef = useRef(null);

    useEffect(() => {

        async function fetch() {
            const response = await test();
            // console.log(response);
            if(response.statusText){
                dispatch(loginSuccess(response.data.data));
                connectWithSocket(response.data.data.id , dispatch );
                
            }
        }
        // disconnect();
        fetch();
        
        

    },[]);

    const authState = useSelector((state)=> state.auth);
    const roomState = useSelector((state)=> state.room);
    // const {userId , username , isAuthenticated} = authState;
    console.log("userId: ",authState);
    
    return ( 
        <Wrapper>
            <SideBar />
            <FriendsSideBar />
            <Messeger />
            <AppBar />
            {roomState.isUserInRoom && <Room />}
        </Wrapper>
     );
}
 
export default Dashboard;