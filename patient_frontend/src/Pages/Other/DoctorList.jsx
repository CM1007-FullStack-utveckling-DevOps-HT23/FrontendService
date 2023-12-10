import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {
    Collapse,
    Divider, FormControl, Grow, InputLabel,
    LinearProgress, MenuItem, Select, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Zoom
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import {useEffect, useState} from "react";
import {
    getAllPatients,
    getDoctorsByName, getEncountersByDoctorId,
    getPatientsByCondition, getPatientsByDoctorId,
    getPatientsByName
} from "../../BackendScripts/PatientScript";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from '@mui/icons-material/Search';

export default function DoctorList() {
    //Hooks
    const [showLoadingBar, setLoadingBar] = useState(false);
    const [doctorRows, setDoctorRows] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searched, setSearched] = useState(false)

    function createData(name, uId) {
        return {name, uId};
    }


    async function handleSearch(event) {
        event.preventDefault();
        setLoadingBar(true);
        setSearchLoading(true);

        const formData = new FormData(event.currentTarget);
        const query = formData.get('query');
        await fetchDoctorsByName(query).then(() => {
            setSearched(true)
        })
    }

    async function fetchDoctorsByName(name) {
        let fetchedData = []
        const result = await getDoctorsByName(name);
        if (result.length !== 0) {
            for (const element of result) {
                const index = result.indexOf(element);
                const doctorId = element.userId;
                const patients = await getPatientsByDoctorId(doctorId)
                const encounters = await getEncountersByDoctorId(doctorId)
                fetchedData[index] = createRowData(element.doctorName, patients, encounters)
            }
            setDoctorRows(fetchedData)
        }

    }

    function createRowData(fullName, patients, encounters) {
        let patientList = [];
        let encounterList = []
        if(patients != undefined && patients != null && patients.length != 0){
            patientList = patients.map(({patientName}) => ({patientName}))
        }
        if(patients != undefined && encounters != null && patients.length != 0){
            encounterList = encounters.map(({patient, encounterDate}) => ({patientName:patient.patientName, date: encounterDate}))
        }

        const row = {
            fullName,
            patientList,
            encounterList
        }
        return row
    }

    //Custom Components
    function CustomRow(input) {
        const element = input.props.element;
        const key = input.props.key;
        const [show, setShow] = useState(false)

        return (
                <React.Fragment key={key}>
                    <TableRow>
                        <TableCell>{element.fullName != null ? element.fullName : '--'}</TableCell>
                        <TableCell><Button size={'small'} sx={{width:'10vw'}} variant={'outlined'} onClick={() => {
                            setShow(!show)
                        }}> View {show ? 'less' : 'more'}</Button></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2} sx={{paddingBottom: 0, paddingTop: 0}}>
                            <Collapse in={show} timeout={"auto"} unmountOnExit>
                                <Box>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <Table style={{width: '80%', marginBottom: '10%'}}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Patients</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {(element !=  null && element.patientList != null) ? element.patientList.map((element, index) => (
                                                        <React.Fragment key={index}>
                                                            <TableRow>
                                                                <TableCell>{element.patientName}</TableCell>
                                                            </TableRow>
                                                        </React.Fragment>

                                                    )) : null}
                                                </TableBody>
                                            </Table>

                                        </Grid>
                                        <Grid item xs={6}>
                                            <Table style={{width: '90%', marginBottom: '10%', marginLeft:'5%'}}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Encounters</TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {(element != null && element.encounterList != null) ? element.encounterList.map((element, index) => (
                                                        <React.Fragment key={index}>
                                                            <TableRow>
                                                                <TableCell>{element.patientName}</TableCell>
                                                                <TableCell> > </TableCell>
                                                                <TableCell>{element.date.split(' ')[0]}</TableCell>
                                                            </TableRow>
                                                        </React.Fragment>

                                                    )) : null}
                                                </TableBody>
                                            </Table>

                                        </Grid>

                                    </Grid>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>


                </React.Fragment>
        );
    }

    return (
        <>
            <Container maxWidth={"lg"}>
                <Fade in={true} appear={true}>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} sx={{marginTop: '5vh'}}>
                            <Typography variant="h3"> Doctors </Typography>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Divider/>
                            <Fade appear={false} in={showLoadingBar}>
                                <LinearProgress/>
                            </Fade>

                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack direction={'row'} spacing={2}>
                                <TableContainer style={{width: "60%"}}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell> Name </TableCell>
                                                <TableCell> </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {doctorRows.map((element, index) => (
                                                <React.Fragment key={index}>
                                                        <CustomRow props={{element: element, index: index}}/>
                                                </React.Fragment>
                                            ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Box
                                    component={'form'}
                                    onSubmit={(event) => {
                                        handleSearch(event).then(() => {
                                            setLoadingBar(false)
                                            setSearchLoading(false)
                                        })
                                    }
                                    }
                                >
                                    <Typography variant={'h5'} sx={{marginBottom: '3%'}}> Search </Typography>
                                    <Stack direction={'row'}>
                                        <TextField
                                            required
                                            type={'text'}
                                            name={'query'}
                                            size={'small'}
                                            sx={{width: '100%'}}
                                            label={'Name of Dr'}
                                            disabled={searchLoading}/>
                                        <Button
                                            type={'submit'}
                                            variant={'contained'}
                                            size="small"
                                            sx={{marginLeft: '4%'}}
                                            disabled={searchLoading}
                                        > <SearchIcon/> </Button>
                                    </Stack>
                                    {doctorRows.length === 0 && searched ?
                                        <Chip label="There are no doctors" variant="outlined"
                                              sx={{marginTop: '5%'}}/> : null
                                    }
                                </Box>
                            </Stack>

                        </Grid>
                    </Grid>
                </Fade>
            </Container>
        </>
    )

}