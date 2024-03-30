import  Button  from "@mui/material/Button";

const CustomButton = ({
    label, additionalStyles,disabled,onClick
}) => {
    return ( <div>
        <Button
        variant = 'contained'
        sx = {{
            bgcolor: "#5865F2",
            color : "white",
            textTransform : 'none',
            fontSize :'16px',
            fontWeight :500,
            width: '100%',
            heigth :'40px'
        }}
        style ={additionalStyles ? additionalStyles : {}}
        disabled={disabled}
        onClick={onClick}
        >{label}</Button>
    </div> );
}
 
export default CustomButton;