import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {Divider} from "@mui/material";
import Fade from "@mui/material/Fade";

export default function HomeDoctor(){
    return(
        <>
            <Container maxWidth={"lg"}>
                <Fade in={true} appear={true}>
                    <Grid container spacing={2} sx={{marginTop:'5vh'}}>
                        <Grid item xs={12} md={12}>
                            <Typography variant="h3"> Home Doctor </Typography>
                            <Divider/>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Typography variant="h5"> Use the buttons above to navigate. </Typography>
                        </Grid>
                    </Grid>
                </Fade>
            </Container>
        </>
    )

}