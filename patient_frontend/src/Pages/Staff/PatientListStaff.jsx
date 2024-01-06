import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {
    Divider,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import {useEffect, useState} from "react";
import {getAllPatients} from "../../BackendScripts/PatientScript";
import Fade from "@mui/material/Fade";
import {useKeycloak} from "@react-keycloak/web";


export default function PatientListStaff() {
    //Hooks
    const [showLoadingBar, setLoadingBar] = useState(true);
    const [patientRows, setPatientRows] = useState([]);
    const navigate = useNavigate();
    const {keycloak} = useKeycloak()

    function handlePatientDetails(uId) {
        navigate("/create-note", {
            state: {
                patientId: uId,
            },
        });
    }

    function createData(name, uId) {
        return {name, uId};
    }


    useEffect(() => {

        async function fetchData() {
            const resultOfFetch = await getAllPatients(keycloak.token);
            let fetchedRowData = [];

            if (resultOfFetch != null) {
                fetchedRowData.length = 0;
                let i = 0;
                resultOfFetch.forEach((element) => {
                    let name = element.patientName != null ? element.patientName : "";
                    let uId = element.patientId;
                    fetchedRowData[i] = createData(name, uId);
                    i++;
                })
                setPatientRows(fetchedRowData);
            }
        }

        fetchData().then(r => {
            setLoadingBar(() => false)
        });
    }, []);


    return (
        <>

            <Container maxWidth={"lg"}>
                <Fade in={true} appear={true}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} sx={{marginTop: '5vh'}}>
                            <Typography variant="h3"> Patients </Typography>
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Divider/>
                            <Fade appear={false} in={showLoadingBar}>
                                <LinearProgress/>
                            </Fade>

                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell> Name </TableCell>
                                            <TableCell> </TableCell>
                                            <TableCell> </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {patientRows.map((row, index) => (
                                            <Fade key={index} in={!showLoadingBar}
                                                  style={{transitionDelay: index * "250" + "ms"}}>
                                                <TableRow key={index}>
                                                    <TableCell> {row.name} </TableCell>
                                                    <TableCell> <Button variant="contained" onClick={() => {
                                                        handlePatientDetails(row.uId)
                                                    }}> Create note </Button>
                                                    </TableCell>
                                                    <TableCell> </TableCell>
                                                </TableRow>
                                            </Fade>
                                        ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {patientRows.length === 0 ?
                                <Chip label="There are no patients" variant="outlined" sx={{marginTop: '5%'}}/> : null
                            }
                        </Grid>
                    </Grid>
                </Fade>
            </Container>

        </>
    )

}