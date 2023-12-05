import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper"
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createAccount} from "../BackendScripts/UserScript";

export default function CreateAccount() {

    //Hooks
    const [role, setRole] = useState('PATIENT');
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleCreation = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if (formData.get("password") != formData.getAll("repeated_password")) {
            setErr(true);
        } else {
            setErr(false);
            setLoading(true);
            const username = formData.get('username');
            const password = formData.get('password');
            const fullName = formData.get('fullName');

            await createAccount(username,password,role,fullName).then(()=>{navigate("/")})
        }
    }

    return (
        <>
            <Container maxWidth="xs">
                <Paper elevation={2}>
                    <Box component="form" onSubmit={handleCreation} sx={{marginTop: "20%"}}>
                        <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
                            <Grid item xs={12} md={12}>
                                <Typography variant="h5"> Create your account </Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    inputMode={"text"}
                                    required
                                    label="Full name"
                                    autoFocus={true}
                                    name="fullName"
                                    disabled={loading}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    inputMode={"text"}
                                    required
                                    label="Username"
                                    name="username"
                                    disabled={loading}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    inputMode={"text"}
                                    required
                                    label="Password"
                                    type="password"
                                    name="password"
                                    disabled={loading}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    inputMode={"text"}
                                    required
                                    label="Repeat password"
                                    type="password"
                                    name="repeated_password"
                                    error={err}
                                    helperText={err ? "Passwords don't match" : ' '}
                                    disabled={loading}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} minWidth={'50%'}>
                                <FormControl fullWidth>
                                    <InputLabel id={"roleLabel"}> Role* </InputLabel>
                                    <Select
                                        onChange={(event) => {
                                            setRole(event.target.value)
                                        }}
                                        value={role}
                                        labelId={"roleLabel"}
                                        label="Role*"
                                        disabled={loading}
                                    >
                                        <MenuItem value={'PATIENT'}>Patient</MenuItem>
                                        <MenuItem value={'STAFF'}>Staff</MenuItem>
                                        <MenuItem value={'DOCTOR'}>Doctor</MenuItem>
                                    </Select>

                                </FormControl>

                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{marginBottom: '10%'}}
                                    disabled={loading}
                                >
                                    Create account
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </>
    )

}