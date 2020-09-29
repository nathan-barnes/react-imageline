// import React from 'react';
import {asyncGetIp, getDate, makeid, asyncToString} from './Logging-Utility'

const firebase = window.firebase;


var firebaseConfig = {
    apiKey: "AIzaSyCSWFQ3ESqg88tqLefSLJNVb4lT3ydjgmI",
    authDomain: "imagelines-lwc-00.firebaseapp.com",
    databaseURL: "https://imagelines-lwc-00.firebaseio.com",
    projectId: "imagelines-lwc-00",
    storageBucket: "imagelines-lwc-00.appspot.com",
    messagingSenderId: "127871690115",
    appId: "1:127871690115:web:ff04863ddbf6b1f4d8c2b6",
    measurementId: "G-BMRQRCC76B"
};

firebase.initializeApp(firebaseConfig);


function logParamReal(name, value, userIp, todaysDatey, TimeStamp ) {
    // var database = firebase.database().ref(id)

    // get user IP address also added ip-address libary.
    const jsonUpdate = {};
    
    jsonUpdate[counter]  = {
        "IP": userIp,
        "name": name,
        "value": value,
        "Counter": counter,
        "Date": todaysDatey,
        "timeStamp": TimeStamp
    };

    database.update(jsonUpdate);

    counter++;
};



//sudo unique ID for session
const uniquId =  makeid(10);


// Get a reference to the database service
let database = firebase.database().ref(uniquId);
database.push();

//fix for Json replace variables
let counter = 0

async function asyncLogParams(name, value) {


    //get user IP and format to nice string
    let temp = await asyncGetIp();
    let userIp = await asyncToString(temp);

    let {ymdDate, timeStamp } = getDate();
    

    //userIp = '136-55-777-22'

    //setup Json string item in db
    const jsonSet = {};
        
        jsonSet[counter]  = {
            "IP": '',
            "name": '',
            "value": 0,
            "Counter": 0,
            "Date": '',
            "timeStamp": ''
        };

    // //initialize this user
    if(counter < 1) {database.set(jsonSet)};

    
    logParamReal(name, value, userIp, ymdDate, timeStamp);
}

export default asyncLogParams;
