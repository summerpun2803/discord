import { Dialog, DialogTitle, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import InputWithLabel from "../../components/Inputwithcomponents";
import CustomButton from "../../components/submitButton";
import { invite } from "../../api";

const AddFriendDialog = ({
    isDialogOpen,
    closeDialogHandler,
    sendFriendInvitaion =()=> {}
}) => {

    const [mail , setMail] = useState('');
    const [isFormValid , setIsFormValid] = useState('');

    const handleSendInvitation =async()=>{
        console.log(mail);
        const response = await invite({mail});

        if(response.error){
            console.log(response);
        }else{
            console.log(response);
            closeDialogHandler();
            setMail("");
        }
    }

    const handleCloseDialog =()=>{
        closeDialogHandler();
        setMail("");
    }
    useEffect(() => {
        if ( mail) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [ mail]);
    return ( 
        <div>
            <Dialog open = {isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>
                    <Typography>Invite a Friend</Typography>
                </DialogTitle>
                <DialogContentText>
                    <Typography>
                        Enter the Mail ID
                    </Typography>
                    <InputWithLabel 
                        label = "Mail"
                        type = "text"
                        value = {mail}
                        setValue = {setMail}
                        placeholder = "Enter mail address"
                    />
                </DialogContentText>
                <DialogActions>
                    <CustomButton 
                        onClick={handleSendInvitation}
                        disabled={!isFormValid}
                        label="Send"
                        additionalStyles={{
                            marginLeft: '15px',
                            marginRight: '15px',
                            marginBottom: '10px',
                        }}
                    />
                </DialogActions>
            </Dialog>
        </div>
     );
}
 
export default AddFriendDialog;