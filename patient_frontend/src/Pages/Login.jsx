import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Chip from "@mui/material/Chip";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {login} from "../BackendScripts/UserScript";
import {useKeycloak} from "@react-keycloak/web";


export default function Login() {

    //Hooks
    const navigate = useNavigate();
    const [loginErr,setLoginErr] = useState(false);
    const {keycloak} = useKeycloak()

    const handleLogin = async (event) => {
        event.preventDefault();


        const formData = new FormData(event.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');

        const res = await login(username,password);

        if(res !== -1){
            console.log(res)
            setLoginErr(false);
            sessionStorage.clear();
            sessionStorage.setItem('userValId',res);

            window.location.reload();

        }else{
            setLoginErr(true);
        }
    }

    function handleCreateAccount() {
        navigate("/create-account")
    }


    return (
        <>
            <Container maxWidth="xs">
                <Box sx={{marginTop:"40%"}}>
                    <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
                        <Grid item xs={12} md={12}>
                            <Typography variant="h3"> Journal system </Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Button
                                variant="outlined"
                                onClick={() => {keycloak.register()}}>
                                Create account
                            </Button>
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <Chip label="or" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Button
                                variant="contained"
                                onClick={() => {keycloak.login()}}>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}