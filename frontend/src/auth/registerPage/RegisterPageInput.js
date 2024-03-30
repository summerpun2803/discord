import InputWithLabel from "../../components/Inputwithcomponents";


const RegisterPageInputs = ({mail , setMail , password , setPassword , username , setUsername}) => {
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
                value = {username}
                setValue = {setUsername}
                label ="Username"
                type = "text"
                placeholder = "Enter Username"
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
 
export default RegisterPageInputs;