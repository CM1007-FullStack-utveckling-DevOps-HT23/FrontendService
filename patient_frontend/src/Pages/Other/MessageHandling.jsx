import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import {Collapse, Divider, FormControl, InputLabel, LinearProgress, MenuItem, Select, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {getNotAnsweredMessages, sendAnsweredMessage} from "../../BackendScripts/PatientScript";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Chip from "@mui/material/Chip";
import SendIcon from '@mui/icons-material/Send';


export default function MessageHandling() {

    // Hooks
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true)

    //Help methods
    function createMessage(message, sender, id) {
        return {message, sender, id};
    }

    useEffect(() => {
        async function fetchData() {
            const resultMessages = await getNotAnsweredMessages(sessionStorage.getItem("userValId"))
            let fetchedData = [];
            let i = 0;
            resultMessages.forEach((element) => {
                let message = element.message != null ? element.message : 'error..';
                let sourceFullName = element.sourceFullName != null ? element.sourceFullName : 'error...';

                fetchedData[i] = createMessage(message, sourceFullName,element.id);
                i++;
            });
            setMessages(fetchedData);
        }

        fetchData().then(() => {
            setLoading(false)
        })
    }, [])


    function CustomComponent(input){
        //Hooks
        const [open, setOpen] = useState(false);
        const [sending, setSending] = useState(false)

        //Input prop
        const element = input.props.element;
        const index = input.props.index;

        async function handleSubmit(event){
            setSending(true);
            event.preventDefault();

            const fd = new FormData(event.currentTarget);
            const messageId = messages[index].id;
            const responsMessage = fd.get('answer');
            //console.log("messageId: " + messageId);


            await sendAnsweredMessage(responsMessage,messageId).then(()=>{
                setTimeout(()=>{
                    setSending(false)
                    setOpen(false)
                    //Message is now answered, should then be removed
                    //Is the messageId still correct when a new array is created? => Yes
                    setMessages(messages.filter(item=>item.id !== element.id))
                },1000)

            })
        }


        return(
            <React.Fragment key={index}>
                <Fade in={!loading} style={{transitionDelay: index * "250" + "ms"}}>

                <Paper elevation={2} sx={{width: '50%', padding: '1%'}}>
                    <Stack direction={"column"} spacing={2}>
                        <Stack direction={"row"} spacing={2}>
                            <Typography variant={"subtitle1."}> {element.sender}:
                                '{element.message}' </Typography>
                            <Chip
                                label={"Open respons-window"}
                                icon={open ? <ArrowDownwardIcon/> : <ArrowForwardIcon/>}
                                variant={'outlined'}
                                onClick={() => {
                                    setOpen(!open)
                                }}
                                sx={{padding: '1%', backgroundColor: '#98ebae'}}/>
                        </Stack>
                        <Collapse in={open} timeout={"auto"} unmountOnExit>
                            <Box component={"form"} onSubmit={(event)=>{handleSubmit(event)}}>
                                <Typography> You respons: </Typography>
                                <Divider sx={{width:'30%', marginTop:'1%', marginBottom:'1%'}}/>
                                <TextField
                                    multiline
                                    rows={5}
                                    type={'text'}
                                    required
                                    disabled={sending}
                                    label={"Answer"}
                                    name={'answer'}
                                    sx={{width:'70%'}}
                                    autoFocus={true}/>
                                <Button
                                    type={"submit"}
                                    variant={"contained"}
                                    sx={{marginLeft:'2%'}}
                                    endIcon={<SendIcon/>}
                                    disabled={sending}> Send </Button>
                            </Box>
                            <Fade appear={false} in={sending}>
                                <LinearProgress sx={{width:'70%'}} style={{marginTop:'-0.5%'}}/>
                            </Fade>
                        </Collapse>
                    </Stack>

                </Paper>
                </Fade>
            </React.Fragment>
        )
    }

    return (
        <>
            <Container maxWidth={"lg"}>
                <Fade in={true} appear={true}>
                    <Grid container spacing={2} sx={{marginTop: '5vh'}}>
                        <Grid item xs={12} md={12}>
                            <Typography variant="h3"> Messages to answer </Typography>
                            <Divider style={{width: '50%'}}/>
                            <Fade appear={true} in={loading} sx={{width: '50%'}}>
                                <LinearProgress/>
                            </Fade>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Stack direction={"column"} spacing={2} sx={{marginBottom:'5%'}}>
                                {messages !== 0 ? messages.map((element, index) => (
                                    <React.Fragment key={index}>
                                        <CustomComponent props={{element: element, index: index}}/>
                                    </React.Fragment>
                                )) : null }
                            </Stack>
                        </Grid>
                    </Grid>
                </Fade>
            </Container>
        </>
    )

}