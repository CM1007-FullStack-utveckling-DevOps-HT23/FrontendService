import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function PageNotFound(){
    return(
        <>
            <Container maxWidth={"lg"}>
                <Typography variant="h3"> Page not found... Try again! </Typography>
            </Container>
        </>
    )

}