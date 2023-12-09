import * as React from "react";
import Fade from "@mui/material/Fade";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {useLocation} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {Divider, LinearProgress} from "@mui/material";
import {useState} from "react";
import DrawComponent from "./DrawComponent";


export default function ViewPatientImage() {
    const location = useLocation();

    return(
        <>
            <Container maxWidth={"lg"}>
                <Fade in={true} appear={true}>
                    <Grid container spacing={2} direction={'column'}>
                        <Grid item xs={12} md={12} sx={{marginTop: '5vh'}}>
                            <Typography
                                variant={'h3'}> Encounter Image </Typography>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Divider/>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <DrawComponent encounterId={location.state.encounterId}/>
                        </Grid>

                    </Grid>
                </Fade>
            </Container>
        </>

    )

}