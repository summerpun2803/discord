import { useEffect, useState } from "react";
import Authbox from "../../components/Authbox";
import LoginPageInputs from "./LoginInputs";
import LoginPageHeader from "./loginPageHeader";
import Footer from "./Footer";
import { login } from "../../api";
import { loginSuccess } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import { useNavigate } from "react-router-dom"
const Login = () => {

    const dispatch= useDispatch();
    const history = useHistory();
    // const navigate = useNavigate();
    const [mail , setMail] = useState("");
    const [password , setPassword] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (password && mail) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [ password, mail ]);

    const handleLogin = async() => {
        const response = await login({mail , password});
        console.log(response);
        if(response.error){
            console.log(response.error);
        }else{
            dispatch(loginSuccess(response.data.username));
            history.push("/dashboard");
        }
    }
    return ( 
        <Authbox>
            <LoginPageHeader />
            <LoginPageInputs 
                mail = { mail }
                setMail = { setMail } 
                password = { password } 
                setPassword = { setPassword }   
            />
            <Footer isFormValid={ isFormValid } handleLogin={handleLogin}/>
        </Authbox>
     );
}
 
export default Login;