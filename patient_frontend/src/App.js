import './App.css';
import Login from "./Pages/Login"
import {useEffect, useState} from "react";
import NavbarStaff from "./Pages/NavbarStaff";
import NavbarDoctor from "./Pages/NavbarDoctor";
import NavbarPatient from "./Pages/NavbarPatient";
import {Route, Routes, useNavigate} from "react-router-dom";
import HomePatient from "./Pages/Patient/HomePatient";
import CreateAccount from "./Pages/CreateAccount";
import HomeStaff from "./Pages/Staff/HomeStaff";
import HomeDoctor from "./Pages/Doctor/HomeDoctor";
import PageNotFound from "./Pages/Other/PageNotFound";
import PatientMessage from "./Pages/Patient/PatientMessage";
import MessageHandling from "./Pages/Other/MessageHandling";
import PatientList from "./Pages/Doctor/PatientList";
import PatientInformation from "./Pages/Other/PatientInformation";
import CreateNote from "./Pages/Other/CreateNote";
import PatientListStaff from "./Pages/Staff/PatientListStaff";
import PatientDetails from "./Pages/Doctor/PatientDetails";
import {getRoleFor} from "./BackendScripts/UserScript";
import DoctorList from "./Pages/Other/DoctorList";
import ViewPatientImage from "./Pages/Doctor/ViewPatientImage";
import {useKeycloak} from "@react-keycloak/web";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function App() {
    //const [isStaff, setIsStaff] = useState(false);
    //const [isDoctor, setIsDoctor] = useState(false);
    //const [isPatient, setIsPatient] = useState(false);
    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    //const [userId, setUserId] = useState('');
    const navigate = useNavigate();
    const {keycloak} = useKeycloak()

    useEffect(() => {
        /*
        if(keycloak.idTokenParsed != undefined){
            const result = keycloak.idTokenParsed.systemRole.toUpperCase()
            let role = result.role;

            switch (role) {
                case 'PATIENT':
                    setIsPatient(true);
                    break;

                case 'DOCTOR':
                    setIsDoctor(true);
                    break;

                case 'STAFF':
                    setIsStaff(true);
                    break;
            }
        }
        */
    }, [])

    function isStaff(){
        return keycloak.idTokenParsed.systemRole.toUpperCase() == "STAFF"
    }

    function isDoctor(){
        return keycloak.idTokenParsed.systemRole.toUpperCase() == "DOCTOR"
    }

    function isPatient(){
        return keycloak.idTokenParsed.systemRole.toUpperCase() == "PATIENT"
    }


    return (
        <>

            {keycloak.authenticated ? null :
                <>
                    <Routes>
                        <Route index element={<Login />}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </>}

            {keycloak.authenticated && isStaff() ? (
                <>
                    <NavbarStaff/>
                    <Routes>
                        <Route index element={<HomeStaff/>}/>
                        <Route path="/home" element={<HomeStaff/>}/>
                        <Route path="/messages" element={<MessageHandling/>}/>
                        <Route path="/patients" element={<PatientListStaff/>}/>
                        <Route path="/create-note" element={<CreateNote/>}/>
                        <Route path="*" element={<PageNotFound/>}/>
                    </Routes>

                </>
            ) : null}


            {keycloak.authenticated && isDoctor() ? (
                <>
                    <NavbarDoctor/>
                    <Routes>
                        <Route index element={<HomeDoctor/>}/>
                        <Route path="/home" element={<HomeDoctor/>}/>
                        <Route path="/messages" element={<MessageHandling/>}/>
                        <Route path="/patients" element={<PatientList/>}/>
                        <Route path="/create-note" element={<CreateNote/>}/>
                        <Route path="/details-patient" element={<PatientInformation/>}/>
                        <Route path="/doctors" element={<DoctorList/>}/>
                        <Route path="/details-patient/encounter-image" element={<ViewPatientImage/>}/>
                        <Route path="*" element={<PageNotFound/>}/>
                    </Routes>
                </>
            ) : null}

            {keycloak.authenticated && isPatient() ? (
                <>
                    <NavbarPatient/>
                    <Routes>
                        <Route index element={<PatientInformation
                            loggedInUserId={/*sessionStorage.getItem("userValId")*/ keycloak.tokenParsed.sub}/>}/>
                        <Route path="/home" element={<PatientInformation
                            loggedInUserId={/*sessionStorage.getItem("userValId")*/ keycloak.tokenParsed.sub}/>}/>
                        <Route path="/messages" element={<PatientMessage/>}/>
                        <Route path="*" element={<PageNotFound/>}/>
                    </Routes>
                </>
            ) : null}

        </>
    );
}

export default App;
