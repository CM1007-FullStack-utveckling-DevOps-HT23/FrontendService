import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {
    Avatar, Collapse,
    Divider,
    LinearProgress, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Chip from "@mui/material/Chip";
import {useState} from "react";
import {useEffect} from "react";
import {getPatientById} from "../../BackendScripts/PatientScript";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";


export default function PatientInformation({loggedInUserId}) {

    //Hooks
    const [showLoadingBar, setShowLoadingBar] = useState(true);
    const location = useLocation();
    const [patient, setPatient] = useState({});
    const navigate = useNavigate()

    //Custom Components
    function CustomRow(input) {
        const element = input.props.element;
        const key = input.props.key;
        const [showObservations, setShowObservations] = useState(false)

        function handleGoToImage(encounterId){
            console.log("ID: " + encounterId)
            navigate("/details-patient/encounter-image", {
                state: {
                    encounterId: encounterId,
                },
            });
        }

        return (
            <React.Fragment key={key}>
                <TableRow>
                    <TableCell>{element.encounterDate != null ? element.encounterDate.split(' ')[0] : '--'}</TableCell>
                    <TableCell><Button size={'small'} variant={'outlined'} onClick={() => {
                        setShowObservations(!showObservations)
                    }}> View observations </Button></TableCell>
                    <TableCell>
                        <Button
                            size={'small'}
                            variant={'outlined'}
                            onClick={()=>{
                                handleGoToImage(element.id)
                            }}
                            disabled={loggedInUserId != null}
                        > Go to related image </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2} sx={{paddingBottom: 0, paddingTop: 0}}>
                        <Collapse in={showObservations} timeout={"auto"} unmountOnExit>
                            <Box>
                                <Table style={{width: '75%', marginLeft: '15%', marginBottom: '10%'}}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Observations</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {element.observations != null ? element.observations.map((element, index) => (
                                            <React.Fragment key={index}>
                                                <TableRow>
                                                    <TableCell>{element.observationDetails}</TableCell>
                                                </TableRow>
                                            </React.Fragment>

                                        )) : null}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>


            </React.Fragment>
        );
    }

    useEffect(() => {
        const fetchPatient = async () => {
            let uId;
            //Can Just check the 'systemRole' with keyCloak if problems arise
            if (loggedInUserId != null) {
                uId = loggedInUserId;
            } else {
                uId = location.state != null && location.state.patientId != null ? location.state.patientId : -1
            }
            const res = await getPatientById(uId);
            //console.log(JSON.stringify(res))

            setPatient(patient => ({
                ...patient,
                ...res
            }));
        }
        fetchPatient().then(r => {setShowLoadingBar(() => false)})

    }, []);

    return (
        <>
            <Container maxWidth={"lg"}>
                <Fade in={true} appear={true}>
                    <Grid container spacing={2} direction={'column'}>
                        <Grid item xs={12} md={12} sx={{marginTop: '5vh'}}>
                            <Typography
                                variant={'h3'}> {patient.patientName != null ? patient.patientName : '---'} </Typography>

                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Divider/>
                            <Fade appear={false} in={showLoadingBar}>
                                <LinearProgress/>
                            </Fade>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack direction={'row'} spacing={3}>
                                <Fade appear={true} in={!showLoadingBar}>

                                    <Paper elevation={2}>
                                        <TableContainer>
                                            <Table style={{width: '40vw'}}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Date of encounter</TableCell>
                                                        <TableCell>Observation</TableCell>
                                                        <TableCell>Image</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {patient.encounters != null ? patient.encounters.map((element, index) => (
                                                        <React.Fragment key={index}>
                                                            <CustomRow props={{element: element, index: index}}/>
                                                        </React.Fragment>
                                                    )) : null}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        {patient.encounters != null && patient.encounters.length === 0 ?
                                            <Chip label="No recent encounter!" sx={{margin: '5%'}}/> : null}
                                    </Paper>
                                </Fade>

                                <Stack direction={'column'} spacing={2}>
                                    <Fade appear={true} in={!showLoadingBar}>
                                        <Paper elevation={2} sx={{padding: '7%'}}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={12}>
                                                    <Typography variant={'h5'}> Conditions </Typography>
                                                </Grid>
                                                {patient.conditions != null ? patient.conditions.map((element, index) => (
                                                        <React.Fragment key={index}>
                                                            <Grid item xs={12} md={12}> - {element.conditionType} </Grid>
                                                        </React.Fragment>
                                                    ))
                                                    : null}
                                                {patient.conditions != null && patient.conditions.length === 0 ?
                                                    <Chip label={"No conditions!"} sx={{margin: '5%'}}/> : null}
                                            </Grid>
                                        </Paper>
                                    </Fade>
                                    <Fade appear={true} in={!showLoadingBar}>
                                        <Paper elevation={2} sx={{padding: '7%', width: '100%'}}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={12}>
                                                    <Typography variant={'h5'}> Notations </Typography>
                                                </Grid>
                                                {patient.notes !== undefined ? patient.notes.map((element, index) => (
                                                    <React.Fragment key={index}>
                                                        <Grid item xs={12} md={12}> {"- '" + element.note + "'"} </Grid>
                                                    </React.Fragment>
                                                )) : null}
                                            </Grid>
                                        </Paper>
                                    </Fade>
                                </Stack>


                            </Stack>
                        </Grid>
                    </Grid>
                </Fade>
            </Container>
        </>
    )

}