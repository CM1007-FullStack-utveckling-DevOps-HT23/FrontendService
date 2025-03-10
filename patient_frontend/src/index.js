import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {BrowserRouter} from "react-router-dom";

//Keycloak
//KeyCloak
import {ReactKeycloakProvider} from "@react-keycloak/web";
import keycloak, {onEvent} from "./BackendScripts/Keycloak";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    //<React.StrictMode>
        <ReactKeycloakProvider authClient={keycloak} onEvent={onEvent} >
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ReactKeycloakProvider>
    //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
