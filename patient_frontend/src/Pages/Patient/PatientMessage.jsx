import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {
    Avatar,
    Collapse,
    Divider,
    FormControl,
    Grow,
    InputLabel,
    LinearProgress, ListSubheader,
    MenuItem,
    Select,
    Stack
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Fade from "@mui/material/Fade";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
    getMessagesFor,
    getPatientById,
    getReceiverDoctors,
    getReceiverStaff,
    sendMessage
} from "../../BackendScripts/PatientScript";
import {getUserById} from "../../BackendScripts/UserScript";
import {useKeycloak} from "@react-keycloak/web";

export default function PatientMessage() {

    //Hooks
    const [showSendMessage, setShowSendMessage] = useState(false);
    const [loading, setLoading] = useState(true)
    const [loadingMessages, setLoadingMessages] = useState(true);
    const [indexValue, setIndexValue] = useState(0);
    const [receivers, setReceivers] = useState([])
    const [messages, setMessages] = useState([])
    const {keycloak} = useKeycloak()

    const handleSendMessage = async (event) => {
        event.preventDefault();

        const fd = new FormData(event.currentTarget);
        if(receivers.length != 0){
            const destId = receivers[indexValue].uId;
            setLoading(true)
            await sendMessage(fd.get("message"), destId, keycloak.tokenParsed.sub, keycloak.token).then(() => {
                setLoading(false)
                setShowSendMessage(false)
            });
        }
    }

    function createData(name, role, uId) {
        return {name, role, uId};
    }

    function createMessage(message, answer, recipient) {
        return {message, answer, recipient}
    }

    useEffect(() => {
        async function fetchData() {
            const resultDoctors = await getReceiverDoctors(keycloak.token);
            const resultStaff = await getReceiverStaff(keycloak.token);

            let fetchedData = [];
            if (resultDoctors != null && resultStaff != null) {

                let i = 0;

                resultDoctors.forEach((element) => {
                    let name = element.fullName != null ? element.fullName : 'err...';
                    fetchedData[i] = createData(name, 'Doctor', element.userId)
                    i++;
                });
                resultStaff.forEach((element, index) => {
                    let name = element.fullName != null ? element.fullName : 'err...';
                    fetchedData[i] = createData(name, 'Staff', element.userId)
                    i++
                })
                setReceivers(fetchedData);
            }
        }

        async function fetchMessages() {
            const resultMessages = await getMessagesFor(/*sessionStorage.getItem('userValId')*/keycloak.tokenParsed.sub,keycloak.token);
            console.log(resultMessages)

            let fetchedData = [];
            let i = 0;
            if (resultMessages != null) {
                for (const element of resultMessages) {
                    const index = resultMessages.indexOf(element);
                    let message = element.message != null ? element.message : "--";

                    let targetFullNameResult = await getUserById(element.targetUserId, keycloak.token);
                    console.log(targetFullNameResult)
                    let targetFullName = targetFullNameResult.fullName != null ? targetFullNameResult.fullName : "--";
                    let answer = element.answer != null && element.answer != "" ? element.answer : "No respons received yet...";
                    fetchedData[i] = createMessage(message, answer, targetFullName);
                    i++;
                }
                //console.log(fetchedData);
                setMessages(fetchedData);
            }

        }

        fetchData().then(() => {
            setLoading(false)
        });
        fetchMessages().then(() => {
            setLoadingMessages(false)
        })
    }, [])

    return (
        <>
            <Fade in={true} appear={true}>
                <Container maxWidth={"lg"}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12} sx={{marginTop: '5vh'}}>
                            <Typography variant="h3"> Messages </Typography>
                            <Divider style={{width: '30%'}}/>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack direction={'row'} spacing={2}>
                                <Typography variant="h5"> Send a message </Typography>
                                <Chip
                                    label={"Message sender"}
                                    icon={showSendMessage ? <ArrowDownwardIcon/> : <ArrowForwardIcon/>}
                                    variant={'outlined'}
                                    onClick={() => {
                                        setShowSendMessage(!showSendMessage)
                                    }}
                                    sx={{padding: '1%', backgroundColor: '#98ebae'}}/>
                            </Stack>
                        </Grid>
                        <Collapse in={showSendMessage} timeout={"auto"} unmountOnExit>
                            <Grid item xs={12} md={12} style={{padding: '5%', width: '40vw'}}>
                                <Box component={'form'} onSubmit={handleSendMessage}>
                                    <Stack direction={'row'} spacing={2}>
                                        <TextField
                                            inputMode={"text"}
                                            required
                                            label={"Message"}
                                            autoFocus={true}
                                            name={"message"}
                                            multiline
                                            rows={5}
                                            sx={{width: '70%'}}
                                            disabled={loading}
                                        />

                                        <Stack direction={'column'} spacing={2}>
                                            <FormControl fullWidth size={"small"}>
                                                <InputLabel id={"receiverLabel"}> Receiver* </InputLabel>
                                                <Select
                                                    labelId={"receiverLabel"}
                                                    label="Receiver*"
                                                    name={'receiver'}
                                                    disabled={loading}
                                                    value={indexValue}
                                                    onChange={(event) => {
                                                        setIndexValue(event.target.value)
                                                    }}
                                                >
                                                    {receivers.map((element, index) => (

                                                        <MenuItem value={index}
                                                                  key={index}> {element.name + ", " + element.role} </MenuItem>

                                                    ))}
                                                </Select>
                                            </FormControl>

                                            <Divider/>
                                            <Button variant={"outlined"} type={"submit"}
                                                    sx={{width: '30%', height: '20%'}}
                                                    disabled={loading}> Send </Button>
                                            <Fade appear={false} in={loading} sx={{width: '50%'}}
                                                  style={{marginTop: '-1%'}}>
                                                <LinearProgress/>
                                            </Fade>

                                        </Stack>
                                    </Stack>
                                </Box>
                            </Grid>
                        </Collapse>

                        <Grid item xs={12} md={12}>
                            <Divider sx={{width: '30%'}}/>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Typography variant="h5"> Your messages </Typography>
                            <Fade appear={true} in={loadingMessages} sx={{width: '50%'}}>
                                <LinearProgress/>
                            </Fade>
                        </Grid>
                        <Box sx={{marginBottom: '5%', width: '100%', height: '100%', padding: '1%'}}>


                            {messages.map((element, index) => (
                                <React.Fragment key={index}>

                                    <Fade in={!loadingMessages} style={{transitionDelay: index * "250" + "ms"}}>
                                        <Grid item xs={12} md={12}>
                                            <Divider sx={{width: '50%'}}/>
                                            <Paper elevation={2} sx={{width: '50%', padding: '1%'}}>
                                                <Stack direction={"column"} spacing={2}>
                                                    <Typography variant={"subtitle1."}> You:
                                                        "{element.message}" </Typography>
                                                    <Typography variant={"subtitle1."}> {element.recipient}:
                                                        "{element.answer}" </Typography>
                                                </Stack>
                                            </Paper>
                                        </Grid>
                                    </Fade>
                                </React.Fragment>

                            ))}
                        </Box>
                    </Grid>
                </Container>
            </Fade>

        </>
    )

}