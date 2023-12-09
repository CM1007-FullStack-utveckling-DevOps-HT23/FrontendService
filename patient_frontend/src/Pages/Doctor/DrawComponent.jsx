import React, {useEffect, useState} from "react";
import {
    Button,
    ButtonGroup,
    Fade,
    FormControl,
    FormControlLabel,
    FormLabel, Grid,
    InputLabel, LinearProgress,
    MenuItem, Radio,
    RadioGroup,
    Select, Stack, TextField, ToggleButton, ToggleButtonGroup,
    Typography
} from "@mui/material";
import {getEncounterImage, postEncounterImage} from "../../BackendScripts/PatientScript";

export default function DrawComponent({encounterId}) {
    //Hooks
    const [brush, setBrush] = useState(0)
    const [textInput, setTextInput] = useState('');
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('black')
    const [colors, setColors] = useState(
        [
            'black',
            'gray',
            'white',
            'yellow',
            'red',
            'blue']
    )
    //#######################################################################
    //Hooks
    //#######################################################################
    const [textBrushExited, setTextBrushExited] = useState(false)
    const [colorBrushExited, setColorBrushExited] = useState(true)
    const [canvas, setCanvas] = useState(null)
    const [context, setContext] = useState(null)
    const [loading, setLoading] = useState(true)


    //#######################################################################
    // Runs on load
    //#######################################################################
    useEffect(() => {

        async function fetchData() {
            //Sets an image in the 'canvas'
            let preCanvas = document.getElementById("myCanvas");
            let preContext = preCanvas.getContext('2d')
            setCanvas(preCanvas)
            setContext(preContext)

            //TODO(UNCOMMENT THIS)
            //await handleGetImage()
        }

        fetchData().then(
            () => {
                setLoading(false)
            }
        )

    }, []);


    //#######################################################################
    //Draw logic
    //#######################################################################
    function handleOnClick(event) {

        let rect = canvas.getBoundingClientRect()
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        if (brush == 0) {
            context.font = "24px Arial";
            context.fillStyle = "black";
            context.textAlign = "start";
            context.fillText(textInput, x, y)
        }
    }

    function handleMouseDown(event) {
        if (event.button == 0 && brush == 1) {
            setIsDrawing(true)
            context.beginPath()
        }
    }

    function handleMouseUp() {
        setIsDrawing(false)
    }

    function handleMouseMove(event) {
        if (isDrawing) {
            let rect = canvas.getBoundingClientRect()
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;

            context.lineTo(x, y)
            context.stroke()
        }
    }


    //#######################################################################
    //Image logic
    //#######################################################################

    async function handleGetImage() {
        await getEncounterImage(encounterId)
            .then(res => {
                //console.log("Function getEncounterImage executed")
                //console.log(res)


                //Convert the result into base64
                var ascii = new Uint8Array(res.data.result.data)
                var b64encoded = btoa(String.fromCharCode.apply(null,ascii))
                //document.getElementById("ItemPreview").src = "data:image/png;base64," + b64encoded
                // <img id="ItemPreview" src="" alt="No image"/>


                const newBlob = new Blob([res.data.result.data], {type: 'image/png'})
                var url = URL.createObjectURL(newBlob);
                var image = new Image()
                image.src = "data:image/png;base64," + b64encoded

                if(image.complete){
                    context.drawImage(image, 0, 0, canvas.width, canvas.height)
                    URL.revokeObjectURL(url)
                }else{
                    image.onload = function () {
                        context.drawImage(image, 0, 0, canvas.width, canvas.height)
                        URL.revokeObjectURL(url)
                    }
                }
            })


    }

    async function handleSendImage(event) {


        try {
            canvas.toBlob(async (blob) => {
                if (blob == null) {
                    console.log("ERROR: Blob from canvas returned null")
                } else {
                    //console.log("Blob-Transformation: Canvas successfully converted to BLOB")

                    await postEncounterImage(encounterId, blob)
                        .then(res => {})

                }
            }, "image/png")
        } catch (err) {
            console.error(err)
        }

    }


    //#######################################################################

    return (
        <>

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                <Grid item xs={6} md={6}>
                    <Fade appear={true} in={loading} sx={{width: '100%'}}>
                        <LinearProgress/>
                    </Fade>
                    <canvas
                        id="myCanvas"
                        width="600"
                        height="600"
                        style={{
                            border: "10px solid gray",
                        }}
                        onClick={(event) => {
                            handleOnClick(event)
                        }}
                        onMouseDown={(event) => {
                            handleMouseDown(event)
                        }}
                        onMouseMove={(event) => {
                            handleMouseMove(event)
                        }}
                        onMouseUp={(event) => {
                            handleMouseUp(event)
                        }}
                    />

                </Grid>
                <Grid item xs={5} md={5} sx={{marginLeft:'5%'}}>
                    <Stack direction={'column'} spacing={5}>
                        <Stack direction={'row'} sx={{justifyContent:'flex-start'}}>
                            <FormControl>
                                <FormLabel> Brush-type </FormLabel>
                                <RadioGroup
                                    row
                                    name={"brushType"}
                                    value={brush}
                                    onChange={(event) => {
                                        setBrush(event.currentTarget.value)
                                    }}>
                                    <FormControlLabel control={<Radio/>} label={"Text"} value={0}/>
                                    <FormControlLabel control={<Radio/>} label={"Brush"} value={1}/>
                                </RadioGroup>
                            </FormControl>

                            <Fade in={brush == 0 && colorBrushExited} appear={false} unmountOnExit={true} onExited={() => {
                                setTextBrushExited(true)
                            }} onEntering={() => {
                                setTextBrushExited(false)
                            }}>

                                <TextField
                                    value={textInput}
                                    onChange={(event) => {
                                        setTextInput(event.currentTarget.value)
                                    }}
                                    label={"Text to draw"}
                                    helperText={"When written tap the image"}
                                >
                                </TextField>
                            </Fade>

                            <Fade in={brush == 1 && textBrushExited} appear={false} unmountOnExit={true} onExited={() => {
                                setColorBrushExited(true)
                            }} onEntering={() => {
                                setColorBrushExited(false)
                            }}>

                                <ButtonGroup variant="contained">
                                    {colors.map((c, index) => (
                                        <React.Fragment key={index}>
                                            <Button sx={{background: '' + c + '', color: c}} onClick={(event) => {
                                                setColor(c)
                                                context.strokeStyle = c
                                            }}></Button>
                                        </React.Fragment>

                                    ))
                                    }
                                </ButtonGroup>
                            </Fade>
                        </Stack>

                        <Button onClick={(event) => {
                            handleGetImage()
                        }}
                                variant={"contained"}> Get </Button>
                        <Button onClick={(event) => {
                            handleSendImage(event)
                        }}
                                variant={"contained"}> Submit </Button>

                        <Button onClick={()=>{context.clearRect(0,0,canvas.width,canvas.height)}} variant={"contained"}> CLEAR CANVAS </Button>
                    </Stack>


                </Grid>

            </Grid>

        </>
    )
}