import * as React from "react";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import PatientInformation from "../Other/PatientInformation";
import Chip from "@mui/material/Chip";
import {Outlet, useLocation} from "react-router-dom";


export default function PatientDetails(){

    //Hooks
    const location = useLocation();

    return(
        <>
            <Container maxWidth={"lg"}>
                <PatientInformation uId={location.state.patientId != null ? location.state.patientId : -1}/>
            </Container>
        </>
    )

}