import { useEffect, useState } from "react";
import Authbox from "../../components/Authbox";
import RegisterPageInputs from "./RegisterPageInput";
import Footer from "./Footer"
import { register } from "../../api"
import { useDispatch } from "react-redux";
import { registerSuccess } from "../../store/authSlice";
import { useHistory } from "react-router-dom";
const Register = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const [mail , setMail] = useState("");
    const [isFormValid , setIsFormValid] = useState(false);

    useEffect(() => {
        if (username && password && mail) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [username, password, mail]);

    const handleRegister = async() => {
        console.log("Registered");
        const response = await register({username , password , mail});
        console.log(response);
        if(response.error){
            console.log(response.error);
        }else{
            dispatch(registerSuccess(response.data.username));
            return history.push("/dashboard");
        }
        
    }
    return ( 
        <Authbox>
            <RegisterPageInputs 
                username = {username}
                setUsername = {setUsername}
                mail = {mail}
                setMail = {setMail} 
                password = {password} 
                setPassword = {setPassword}
            />
            <Footer isFormValid = {isFormValid} handleRegister = {handleRegister}/>
        </Authbox>
     );
}
 
export default Register;