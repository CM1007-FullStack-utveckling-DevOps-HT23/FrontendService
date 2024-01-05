//TODO("Change to CBHCloud")

import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
    url: "http://localhost:8080/auth",              //Change this to the correct address
    realm: "Journal-realm",                         //Change this to the name of the realm
    clientId: "React-auth-Journal",                 //Change this to the name of the created client. OBS: DON'T FORGET MAPPING!!!
});
export default keycloak;