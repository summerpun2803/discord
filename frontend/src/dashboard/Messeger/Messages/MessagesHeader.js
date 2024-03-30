import { styled } from "@mui/system";
import Avatar from "../../../components/Avatar";
import { Typography } from "@mui/material";


const MainContainer = styled("div")({
    width: "98%",
    display : "table-column",
    // alignItems : "center",
    marginTop: "10px"
})
const MessagesHeader = ({name = " "}) => {
    return ( 
        <MainContainer>
            <Avatar large username= {name} />
            <Typography
                variant="h4"
                sx ={{
                    fontWeight: "bold",
                    color: "white",
                    marginLeft: "5px",
                    marginRight:"5px",
                }}
            >
                {name}
            </Typography>
        </MainContainer>
     );
}
 
export default MessagesHeader;