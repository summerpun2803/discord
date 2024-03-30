import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CustomButton from "../../components/submitButton";

const Footer = ({ handleLogin , isFormValid}) => {
    return ( 
        <div>
            <CustomButton 
                label = "Log in"
                additionalStyles={{marginTop : "30px"}}
                disabled={!isFormValid}
                onClick={handleLogin}
            />
            <Link to = "/register">SignUp</Link>
        </div>
        
     );
}
 
export default Footer;