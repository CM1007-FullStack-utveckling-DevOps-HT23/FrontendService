import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Chip from "@mui/material/Chip";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {login} from "../BackendScripts/UserScript";



export default function Login() {

    //Hooks
    const navigate = useNavigate();
    const [loginErr,setLoginErr] = useState(false);


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
                <Box component="form" onSubmit={handleLogin} sx={{marginTop:"40%"}}>
                    <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
                        <Grid item xs={12} md={12}>
                            <Typography variant="h3"> Login </Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                inputMode={"text"}
                                required
                                label="Username"
                                autoFocus={true}
                                name="username"
                                error={loginErr}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                inputMode={"text"}
                                required
                                label="Password"
                                type="password"
                                name="password"
                                helperText={loginErr ? "Wrong username or Password" : ''}
                                error = {loginErr}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Button
                                variant="outlined"
                                onClick={handleCreateAccount}>
                                Create account
                            </Button>
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <Chip label="or" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Button
                                variant="contained"
                                type="submit">
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}