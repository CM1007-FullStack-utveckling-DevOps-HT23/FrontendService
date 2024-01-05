import * as React from "react";
import Typography from "@mui/material/Typography";
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {useKeycloak} from "@react-keycloak/web";

export default function NavbarStaff(){
    const navigate = useNavigate();
    const {keycloak} = useKeycloak()

    function handleLogOut(){
        keycloak.logout().then(() => {navigate("/")})
    }

    return(
        <>
            <Paper elevation={2} square={true} sx={{backgroundColor:"#d5e0f2"}}>
                <Box sx={{width:"100%", height:"9vh", display:"flex", flexDirection:"row" }}>

                    <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={4} sx={{marginLeft:"5%"}}>
                        <SensorOccupiedIcon sx={{fontSize:50}}/>
                        <Typography variant="h5" component={Link} to="/" sx={{textDecoration:"none", color:"black"}}> Staff Overview </Typography>
                        <Button variant="outlined" component={Link} to="/patients"> All patients </Button>
                        <Button variant="outlined" component={Link} to="/messages"> Messages </Button>
                        <Button variant="outlined" onClick={handleLogOut}> Logout </Button>
                    </Stack>

                </Box>
            </Paper>

        </>
    )
}