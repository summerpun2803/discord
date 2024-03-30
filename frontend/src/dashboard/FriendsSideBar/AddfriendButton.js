import { useState } from "react";
import CustomButton from "../../components/submitButton";
import AddFriendDialog from "./AddFrienDialog";


const additionalStyles ={
    marginTop:'10px',
    marginLeft:'5px',
    width: '100%',
    heigth: '30px',
    background: '#3ba55d',
}

const handleClick = () => {
    console.log("Add friend");
}
const AddFriendButton = () => {
    const [isDialogOpen , setIsDialogOpen] = useState(false);

    const handleOpenAddFriendDialog = () => {
        setIsDialogOpen(true);
    }
    const handleCloseAddFriendDialog = () => {
        setIsDialogOpen(false);
    }


    return ( 
        <>
            <CustomButton 
                additionalStyles={additionalStyles}
                label = 'Add Friend'
                onClick = {handleOpenAddFriendDialog}
            />
            <AddFriendDialog 
                isDialogOpen={isDialogOpen}
                closeDialogHandler={handleCloseAddFriendDialog}
            />
        </>
     );
}
 
export default AddFriendButton;