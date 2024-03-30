import { setLocalStream, setRemoteStream } from "../store/roomSlice";
import { store } from "../store/store";
import { getStreamGlobal } from "./roomHandler";
import Peer from 'simple-peer';
import { signalPeerData } from "./socketCommunication";


const onlyAudioConstraints = {
    audio : true,
    video : false,
}
const defaultConstraints = {
    video : true,
    audio : true,
}
let peer = {};

const getConfiguration = () => {
    const turnIceServers = null;
    if(turnIceServers){

    }else{
        console.warn("using STUN servers");
        return {
            iceServers : [
                {
                    urls :"stun:stun.l.google.com:19302",
                }
            ]
        }
    }
}

export const getLocalStreamPreview = (onlyAudio= true , successCallBackFunc ) => {

    const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;
    
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        console.log("Stream :  ",stream);
        // store.dispatch(setLocalStream(stream));
        successCallBackFunc(stream);
    }).catch(error => {
        console.log(error);
        console.log("Streaming Error");
    })

}



export const preparePeerConn = (connUserSocketId , isInitaitor) =>{
    const localStream = getStreamGlobal();

    if(isInitaitor){
        console.log("initiator")
    }else{
        console.log("Not initiator")
    }

    peer[connUserSocketId] = new Peer({
        initiator: isInitaitor,
        config : getConfiguration(),
        stream : localStream
    });
    
    peer[connUserSocketId].on('signal' , data => {
        const signalData = {
            signal : data,
            connUserSocketId : connUserSocketId,
        };
        console.log("signaling")
        signalPeerData(signalData);


    })
    
    peer[connUserSocketId].on('stream' , (remoteStream) => {
        console.log("remote stream came");
        remoteStream.connUserSocketId = connUserSocketId;
        addNewRemoteStream(remoteStream);
    })
}

export const handleSinalingData= (data) => {
    const {connUserSocketId , signal} = data;
    console.log("signal received")
    if(peer[connUserSocketId]) {
        peer[connUserSocketId].signal(signal);
    }
}


const addNewRemoteStream = (newRemoteStream) => {
    const remoteStreams = store.getState().room.remoteStreams;
    const newRemoteStreams = [...remoteStreams , newRemoteStream];

    store.dispatch(setRemoteStream(newRemoteStreams))
}

export const closeAllConnection = () => {
    
   try{
    Object.entries(peer).forEach((mappedObject) => {
        const connUserSocketId = mappedObject[0];
        if (peer[connUserSocketId]) {
            peer[connUserSocketId].destroy();
            delete peer[connUserSocketId];
        }
    });
   }catch(err){
    console.log("error" , err);
   }  
}
export const handleLeft = (data) => {

    try{
        
        const {connUserSocketId} = data;
        if(peer[connUserSocketId]){
            peer[connUserSocketId].destroy();
            delete peer[connUserSocketId];
        }

        const remoteStreams = store.getState().room.remoteStreams || [];
        console.log(remoteStreams);
        const updatedRemoteStream = remoteStreams.filter((remoteStream) => {
            return remoteStream.connUserSocketId !== connUserSocketId;
        })
        console.log("in the left area" , connUserSocketId);

        store.dispatch(setRemoteStream(updatedRemoteStream))
    }catch(err){
        console.log("error" , err);
    }
    
}