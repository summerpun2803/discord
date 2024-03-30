import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CustomButton from "../../components/submitButton";

const Footer = ({ handleRegister , isFormValid}) => {
    return ( 
        <div>
            <CustomButton 
                label = "Register"
                additionalStyles={{marginTop : "30px"}}
                disabled={!isFormValid}
                onClick={handleRegister}
            />
            
        </div>
     );
}
 
export default Footer;