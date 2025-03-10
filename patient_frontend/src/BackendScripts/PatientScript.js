import axios from "axios";
import {API_IMAGE, API_MESSAGE, API_PATIENT, API_QUARKUS_SEARCH, API_USER} from "../config";

const authConfig = (token) =>{
    return{
            headers : {
                'Authorization': 'Bearer ' + token
            }
        }
}
export async function getAllPatients(token) {
    const url = `${API_PATIENT}/list`;

    try {
        const result = await axios.get(url, authConfig(token));
        return result.data;
    } catch (error) {
        console.log(error);
    }

    //return [{patientName: 'Robin', patientId: '1'}, {patientName: 'Lasse', patientId: '2'}];
}

export async function getPatientById(id, token) {
    const url = `${API_PATIENT}/${id}`;

    try {
        const result = await axios.get(url, authConfig(token));
        return result.data;
    } catch (error) {
        console.log(error);
    }
/*
    return ({
        "patientId": 1,
        "patientName": "Buss",
        "encounters": [
            {
                "id": 1,
                "patientId": 1,
                "encounterDate": "2023-11-15 00:00:00",
                "observations": [
                    {
                        "id": 1,
                        "encounterId": 1,
                        "observationDetails": "Huge nipps"
                    }
                ]
            },
            {
                "id": 2,
                "patientId": 1,
                "encounterDate": "2023-11-16 00:00:00",
                "observations": [
                    {
                        "id": 2,
                        "encounterId": 2,
                        "observationDetails": "Large toes"
                    }
                ]
            }
        ],
        "conditions": [
            {
                "id": 1,
                "patientId": 1,
                "conditionType": "Bee stung"
            },
            {
                "id": 2,
                "patientId": 1,
                "conditionType": "Cancer"
            }
        ],
        "notes": [
            {
                "id": 1,
                "text": "Dumass"
            },
            {
                "id": 2,
                "text": "Bigtime"
            }
        ]
    });

 */
}

export async function sendMessage(message, destId, srcID,  token) {
    const url = `${API_MESSAGE}/send`;
    //const srcID = sessionStorage.getItem('userValId');

    const data = {
        message: message,
        sourceUserId: srcID,
        targetUserId: destId
    };

    try {
        const result = await axios.post(url, data, authConfig(token));
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getReceiverDoctors(token) {
    const url = `${API_USER}/list/role/doctor`;

    try {
        const result = await axios.get(url, authConfig(token));
        return result.data;
    } catch (error) {
        console.log(error);
    }

    /*
    return [
        {
            userId: "1",
            fullName: "Dr Doffen"
        },
        {
            userId: "2",
            fullName: "Dr Andersson"
        },
        {
            userId: "3",
            fullName: "Dr Afton"
        },
        {
            userId: "4",
            fullName: "Dr House"
        },

    ];

 */

}

export async function getReceiverStaff(token) {
    const url = `${API_USER}/list/role/staff`;

    try {
        const result = await axios.get(url, authConfig(token));
        return result.data;
    } catch (error) {
        console.log(error);
    }

    /*
    return [
        {
            userId: "8",
            fullName: "Micheal Schmidtt"
        },
        {
            userId: "9",
            fullName: "Neo"
        },
        {
            userId: "10",
            fullName: "Bonnie Johnsson"
        },
        {
            userId: "11",
            fullName: "The Medic"
        },
    ];

     */
}

export async function getMessagesFor(uId, token) {
    const url = `${API_MESSAGE}/source/${uId}`;

    try {
        const result = await axios.get(url, authConfig(token));
        return result.data;
    } catch (error) {
        console.log(error);
    }

    /*
    return [
        {
            id: "1",
            sourceUserId: "1",
            targetUserId: "1",
            message: "Brother man, please I need help!",
            sentDate: "2023-11-16 00:00:00",
            answerDate: "",
            answer: "Na, get outta here.",
            targetFullName: 'Doctor Doofen'
        },
        {
            id: "1",
            sourceUserId: "1",
            targetUserId: "1",
            message: "I have cancer",
            sentDate: "2023-11-17 00:00:00",
            answerDate: "",
            answer: "No.",
            targetFullName: 'Doctor Doofen'
        },
        {
            id: "1",
            sourceUserId: "1",
            targetUserId: "1",
            message: "Ambulance please.",
            sentDate: "2023-12-16 00:00:00",
            answerDate: "",
            answer: "Yes.",
            targetFullName: 'Doctor Doofen'
        },
        {
            id: "1",
            sourceUserId: "1",
            targetUserId: "1",
            message: "Brother man, please I need help!",
            sentDate: "2023-11-9 00:00:00",
            answerDate: "",
            answer: "Na, get outta here.",
            targetFullName: 'Doctor Doofen'
        },
        {
            id: "1",
            sourceUserId: "1",
            targetUserId: "1",
            message: "Brother man, please I need help! Hello???",
            sentDate: "2023-10-16 00:00:00",
            answerDate: "",
            answer: "",
            targetFullName: 'Doctor Doofen'
        }
    ];

     */
}

export async function getNotAnsweredMessages(uId, token){
    const url = `${API_MESSAGE}/target/${uId}`;

    try {
        const result = await axios.get(url, authConfig(token));
        return result.data;
    } catch (error) {
        console.log(error);
    }
    /*
    return [
        {
            id: "1",
            sourceUserId: "1",
            targetUserId: "1",
            message: "Brother man, please I need help!",
            sentDate: "2023-11-16 00:00:00",
            answerDate: "",
            answer: "",
            targetFullName: 'Doctor Doofen',
            sourceFullName:'Robin Flink'
        },
        {
            id: "2",
            sourceUserId: "1",
            targetUserId: "2",
            message: "Im begging, help me!",
            sentDate: "2023-11-16 00:00:00",
            answerDate: "",
            answer: "",
            targetFullName: 'Doctor Doofen',
            sourceFullName:'Robin Flink'
        }
    ];

     */
}

export async function sendAnsweredMessage(message, messageId, token){
    const url = `${API_MESSAGE}/answer/${messageId}`;
    const data = {
        answer: message
    };

    try {
        const result = await axios.post(url, data, authConfig(token));
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export async function createNoteForPatient(note, patientId, token){
    const url = `${API_PATIENT}/addNote/${patientId}`;
    const data = {note}

    try {
        const result = await axios.post(url, data, authConfig(token));
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getPatientsByName(name, token){
    const url = `${API_QUARKUS_SEARCH}/getPatients/byFullName?fullName=${name}`;

    try {
        const result = await axios.get(url, authConfig(token));
        return result.data;
    } catch (error) {
        console.log(error);
    }

    /*
        [
        {
            'patientId':'1',
            'fullName':'Robert Schmidtt'
        },
        {
            'patientId':'2',
            'fullName':'Bob Schmidtt'
        },
        {
            'patientId':'3',
            'fullName':'Jer Schmidtt'
        }
    ]
     */
}

export async function getPatientsByCondition(condition, token){
    const url = `${API_QUARKUS_SEARCH}/getPatients/byConditionType?conditionType=${condition}`;

    try {
        const result = await axios.get(url, authConfig(token));
        return result.data;
    } catch (error) {
        console.log(error);
    }
    /*
    [
        {
            'patientId':'2',
            'fullName':'Bob Schmidtt'
        }
    ]

     */
}

export async function getDoctorsByName(name, token){
    const url = `${API_QUARKUS_SEARCH}/getDoctors/byFullName?fullName=${name}`;

    try {
        const result = await axios.get(url, authConfig(token));
        return result.data;
    } catch (error) {
        console.log(error);
    }
    /*
    [
        {
            'uId':'2',
            'fullName':'Bob Schmidtt',
            'patients':[
                {
                  'id':'0',
                    'patientId':'1',
                    'fullName':'John Johnson'
                },
                {
                    'id':'1',
                    'patientId':'1',
                    'fullName':'Mitch Scott'
                },
                {
                    'id':'2',
                    'patientId':'1',
                    'fullName':'Jarvan IV'
                }
            ],
            'encounters':[
                {
                    'id':'0',
                    'patientId':'1',
                    'fullName':'Jarvan IV' ,
                    'date':'2022-01-01'
                },
                {
                    'id':'1',
                    'patientId':'3',
                    'fullName':'Karl' ,
                    'date':'2022-10-10'
                }
            ]
        }
    ]

     */
}

export async function getPatientsByDoctorId(doctorId, token) {
    const url = `${API_QUARKUS_SEARCH}/getPatients/byDoctorId?doctorId=${doctorId}`;

    try {
        const result = await axios.get(url, authConfig(token));
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getEncountersByDoctorId(doctorId, token) {
    const url = `${API_QUARKUS_SEARCH}/getEncounters/byDoctorId?doctorId=${doctorId}`;

    try {
        const result = await axios.get(url, authConfig(token));
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export async function createPatient(userId, fullName, token){
    const url = `${API_PATIENT}/add`;
    const data = {
        id: userId,
        fullName: fullName
    };
    try {
        const result = await axios.post(url, data, authConfig(token));
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getEncounterImage(encounterId, token){
    try {
        const result = await axios.get(API_IMAGE + '/getImage',
            {
                params:{
                    encounterId:encounterId
                },
                headers : {
                    'Authorization': 'Bearer ' + token
                }
            })
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function postEncounterImage(encounterId, blob, token){
    try{
        await axios.post(API_IMAGE + '/putImage', {
            encounterId : encounterId,
            blob: blob
        }, {
            headers : {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            }
        }).then((data) => console.log(data))
    }catch (error){
        console.log(error)
    }
}
