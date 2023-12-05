import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import VaccinesIcon from '@mui/icons-material/Vaccines';

export default function NavbarDoctor(){

    function handleLogOut(){
        sessionStorage.clear();
        window.location.reload();
    }

    return(
        <>
            <Paper elevation={2} square={true} sx={{backgroundColor:"#d5e0f2"}}>
                <Box sx={{width:"100%", height:"9vh", display:"flex", flexDirection:"row" }}>

                    <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={4} sx={{marginLeft:"5%"}}>
                        <VaccinesIcon sx={{fontSize:45}}/>
                        <Typography variant="h4" component={Link} to="/" sx={{textDecoration:"none", color:"black"}}> Doctor's Overview </Typography>
                        <Button variant="outlined" component={Link} to="/patients"> All patients </Button>
                        <Button variant="outlined" component={Link} to="/doctors"> Doctors </Button>
                        <Button variant="outlined" component={Link} to="/messages"> Messages </Button>
                        <Button variant="outlined" onClick={handleLogOut}> Logout </Button>
                    </Stack>

                </Box>
            </Paper>

        </>
    )

}