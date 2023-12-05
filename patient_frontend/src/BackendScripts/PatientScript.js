import axios from "axios";
import {API_MESSAGE, API_PATIENT, API_USER} from "../config";


export async function getAllPatients() {
    const url = `${API_PATIENT}/list`;

    try {
        const result = await axios.get(url);
        return result.data;
    } catch (error) {
        console.log(error);
    }

    //return [{patientName: 'Robin', patientId: '1'}, {patientName: 'Lasse', patientId: '2'}];
}

export async function getPatientById(id) {
    const url = `${API_PATIENT}/${id}`;

    try {
        const result = await axios.get(url);
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

export async function sendMessage(message, destId) {
    const url = `${API_MESSAGE}/send`;
    const srcID = sessionStorage.getItem('userValId');

    const data = {
        message: message,
        sourceUserId: srcID,
        targetUserId: destId
    };

    try {
        const result = await axios.post(url, data);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getReceiverDoctors() {
    const url = `${API_USER}/list/role/doctor`;

    try {
        const result = await axios.get(url);
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

export async function getReceiverStaff() {
    const url = `${API_USER}/list/role/staff`;

    try {
        const result = await axios.get(url);
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

export async function getMessagesFor(uId) {
    const url = `${API_MESSAGE}/source/${uId}`;

    try {
        const result = await axios.get(url);
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

export async function getNotAnsweredMessages(uId){
    const url = `${API_MESSAGE}/target/${uId}`;

    try {
        const result = await axios.get(url);
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

export async function sendAnsweredMessage(message, messageId){
    const url = `${API_MESSAGE}/answer/${messageId}`;
    const data = {
        answer: message
    };

    try {
        const result = await axios.post(url, data);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export async function createNoteForPatient(note, patientId){
    const url = `${API_PATIENT}/addNote/${patientId}`;
    const data = {note}

    try {
        const result = await axios.post(url, data);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getPatientsByName(name){
    return [
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
}

export async function getPatientsByCondition(condition){
    return [
        {
            'patientId':'2',
            'fullName':'Bob Schmidtt'
        }
    ]
}

export async function getDoctorsByName(name){
    return [
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
}

export async function createPatient(userId, fullName){
    const url = `${API_PATIENT}/add`;
    const data = {
        id: userId,
        fullName: fullName
    };
    try {
        const result = await axios.post(url, data);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

