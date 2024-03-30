import { Typography } from "@mui/material";
import { useEffect, useState} from "react";
import { useSelector } from "react-redux";


const ChosenOptionLabel = () => {
    const chosenChatDetails = useSelector((state) => state.chat.chosenChatDetails);
    const [name, setName] = useState(null);
    useEffect(() => {
        if (chosenChatDetails) {
            setName(chosenChatDetails.name);
        } else {
            setName(null); 
        }
    }, [chosenChatDetails]);

    return ( 
        <Typography
            sx={{fontSize:'16px', color:'white' , fontWeight:'bold'}}
        >
            {name ? name : " "}
        </Typography>
     );
}
 
export default ChosenOptionLabel;