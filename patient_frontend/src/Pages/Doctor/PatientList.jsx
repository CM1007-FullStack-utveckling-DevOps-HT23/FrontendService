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
import {getAllPatients, getPatientsByCondition, getPatientsByName} from "../../BackendScripts/PatientScript";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from '@mui/icons-material/Search';

export default function PatientList() {
    //Hooks
    const [showLoadingBar, setLoadingBar] = useState(true);
    const [patientRows, setPatientRows] = useState([]);
    const navigate = useNavigate();
    const [category, setCategory] = useState('Name');
    const [searchLoading, setSearchLoading] = useState(false);

    function createData(name, uId) {
        return {name, uId};
    }

    function handelPatientDetails(uId) {
        navigate("/details-patient", {
            state: {
                patientId: uId,
            },
        });
    }

    function handleCreateNote(uId) {
        navigate("/create-note", {
            state: {
                patientId: uId,
            },
        });
    }

    async function handleSearch(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        setSearchLoading(true);
        setLoadingBar(true);
        patientRows.length = 0;
        const query = formData.get('query')


        switch (category) {
            case 'Name':
                await fetchPatientsByName(query).then(()=>{
                        setSearchLoading(false)
                        setLoadingBar(false)
                }
                )
                break;

            case 'Condition':
                await fetchPatientsByCondition(query).then(()=>{
                    setSearchLoading(false)
                    setLoadingBar(false)
                })
                break;

            default:
                alert('Something went wrong...')
                setSearchLoading(false);
                setLoadingBar(false);
                break;
        }
    }

    async function fetchPatientsByName(name){
        let fetchedData = []
        const result = await getPatientsByName(name);
        if(result.length !== 0){
            result.forEach((value,index)=>{
                let name = value.patientName != null ? value.patientName : "";
                let uId = value.patientId;
                fetchedData[index] = createData(name, uId);
            })
            setPatientRows(fetchedData);
        }


    }

    async function fetchPatientsByCondition(condition){
        let fetchedData = []
        const result = await getPatientsByCondition(condition)
        if(result.length !== 0){
            result.forEach((value,index)=>{
                let name = value.patientName != null ? value.patientName : "";
                let uId = value.patientId;
                fetchedData[index] = createData(name, uId);
            })
            setPatientRows(fetchedData);
        }
    }

    useEffect(() => {
        async function fetchData() {
            const resultOfFetch = await getAllPatients();
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
            setTimeout(() => {
                setLoadingBar(() => false)
            }, 1000)
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
                            <Stack direction={'row'} spacing={2}>
                                <TableContainer style={{width: "50%"}}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell> Name </TableCell>
                                                <TableCell> </TableCell>
                                                <TableCell> </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {patientRows.map((row, index) => (
                                                <React.Fragment key={index}>
                                                    <Fade in={!showLoadingBar}
                                                          style={{transitionDelay: index * "250" + "ms"}}>
                                                        <TableRow key={index}>
                                                            <TableCell> {row.name} </TableCell>
                                                            <TableCell> <Button size="small" variant="contained"
                                                                                onClick={(event) => {
                                                                                    handleCreateNote(row.uId)
                                                                                }}> Create note </Button>
                                                            </TableCell>
                                                            <TableCell> <Button size="small" variant="contained"
                                                                                onClick={(event) => {
                                                                                    handelPatientDetails(row.uId)
                                                                                }}> Se more </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    </Fade>
                                                </React.Fragment>
                                            ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Box
                                    component={'form'}
                                    onSubmit={(event)=>
                                    {
                                        handleSearch(event)
                                    }
                                    }
                                >
                                    <Typography variant={'h5'} sx={{marginBottom:'3%'}}> Search </Typography>
                                    <Stack direction={'row'}>
                                        <FormControl fullWidth>
                                            <InputLabel id={"categoryLabel"}> Category </InputLabel>
                                            <Select
                                                onChange={(event) => {
                                                    setCategory(event.target.value)
                                                }}
                                                value={category}
                                                labelId={"categoryLabel"}
                                                label="Category"
                                                disabled={searchLoading}
                                                size={'small'}
                                                sx={{width:'10vw'}}
                                            >
                                                <MenuItem value={'Name'}>Name</MenuItem>
                                                <MenuItem value={'Condition'}>Condition</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <TextField
                                            required
                                            type={'text'}
                                            name={'query'}
                                            size={'small'}
                                            sx={{width:'100%'}}
                                            label={category}
                                            disabled={searchLoading}/>
                                        <Button
                                            type={'submit'}
                                            variant={'contained'}
                                            size="small"
                                            sx={{marginLeft:'4%'}}
                                            disabled={searchLoading}
                                            > <SearchIcon/> </Button>
                                    </Stack>
                                </Box>
                            </Stack>
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