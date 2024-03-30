import InputWithLabel from "../../components/Inputwithcomponents";

const LoginPageInputs = ({mail , setMail , password , setPassword}) => {
    return ( 
        <div>
            <InputWithLabel 
                value = {mail}
                setValue = {setMail}
                label ="E-mail"
                type = "text"
                placeholder = "Enter Mail ID"
            />
            <InputWithLabel 
                value = {password}
                setValue = {setPassword}
                label ="password"
                type = "password"
                placeholder = "Enter password"
            />
        </div>
     );
}
 
export default LoginPageInputs;