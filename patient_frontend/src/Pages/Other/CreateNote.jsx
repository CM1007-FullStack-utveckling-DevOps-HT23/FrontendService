import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {Divider, LinearProgress, Stack, TextareaAutosize} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import Fade from "@mui/material/Fade";
import {createNoteForPatient} from "../../BackendScripts/PatientScript";

export default function CreateNote() {

    //Hooks
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);


    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const note = formData.get("note");
        const uID = location.state != null && location.state.patientId != null ? location.state.patientId : -1;

        await createNoteForPatient(note,uID).then(()=>{
            setLoading(true);
            navigate('/patients')
        })
    }

    return (
        <>
            <Container maxWidth={"lg"}>
                <Fade in={true} appear={true}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} sx={{marginTop: '5%'}}>
                            <Typography variant="h3"> Create note </Typography>
                            <Divider style={{width: "50%"}}/>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Box component={"form"} onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12}>
                                        <Stack direction={'column'} spacing={2}>
                                            <TextField
                                                inputMode={"text"}
                                                required
                                                label={"Note"}
                                                autoFocus={true}
                                                name={"note"}
                                                multiline
                                                rows={10}
                                                sx={{width: '50%'}}
                                                disabled={loading}
                                            />
                                            <Button variant={"outlined"} type={"submit"} sx={{width: '20%'}}
                                                    disabled={loading}> Submit </Button>
                                            <Fade appear={false} in={loading}>
                                                <LinearProgress sx={{width:'20%'}} style={{marginTop:'-0.5%'}}/>
                                            </Fade>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Fade>
            </Container>
        </>
    )

}