import * as React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {Link} from 'react-router-dom';
import Container from "@mui/material/Container";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Grid from "@mui/material/Grid";

export default function NavbarPatient(){
    function handleLogOut(){
        sessionStorage.clear();
        window.location.reload();
    }

    return(
        <>
            <Paper elevation={2} square={true} sx={{backgroundColor:"#d5e0f2"}}>
                <Box sx={{width:"100%", height:"9vh", display:"flex", flexDirection:"row" }}>

                            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={4} sx={{marginLeft:"5%"}}>
                                <LocalHospitalIcon sx={{fontSize:50}}/>
                                <Typography variant="h4" component={Link} to="/" sx={{textDecoration:"none", color:"black"}}> Journal </Typography>
                                <Button variant="outlined" component={Link} to="/messages"> My Messages </Button>
                                <Button variant="outlined" component={Link} to="/"> My Journal </Button>
                                <Button variant="outlined" onClick={handleLogOut}> Logout </Button>
                            </Stack>

                </Box>
            </Paper>

        </>
    )
}