//TODO("Change to CBHCloud")

import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: "https://130.237.11.66:2530/",
    realm: "fullstack_cm1007",
    clientId: "React-auth-Journal"
});
export default keycloak;


export const onEvent = (event, error) => {
    //console.log('onKeycloakEvent', event, error)
    if(event == 'onAuthLogout')
        window.location.href = ""

}


/*
import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: "http://localhost:8080/auth",              //Change this to the correct address
    realm: "Journal-realm",                         //Change this to the name of the realm
    clientId: "React-auth-Journal",                 //Change this to the name of the created client. OBS: DON'T FORGET MAPPING!!!
});
export default keycloak;

 */