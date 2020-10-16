// import React from 'react';
import {asyncGetIp, getDate, makeid, asyncToString, boolToInt} from './Logging-Utility'

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


//Authentication
firebase.auth().signInAnonymously()
// .catch(function(error) {
    // Handle Errors here.
    // var errorCode = error.code;
    // var errorMessage = error.message;
    // console.log(errorCode, errorMessage);
// });

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;

        // console.log(isAnonymous, uid);
        // ...
    } else {
        // User is signed out.
        // ...
    }
    });

//fix for Json replace variables
let counter = 0


//sudo unique ID for session
const uniquId =  makeid(20);
//I think this might need to be generated as a state variable.  Maybe with UseRef() and UseEffect to run the operation once?  
// Don't know for certain since it seems to work, 
// but at the same time, i'm not sure how to place it so that it's accessible for console logging or as a hidden variable. 


// Get a reference to the database service
let database = firebase.database().ref(uniquId);
database.push();




function logParamReal(name, value, userIp, todaysDatey, TimeStamp, DataOutputs) {
    

    // get user IP address also added ip-address libary.
    const jsonUpdate = {};
    
    jsonUpdate[counter]  = {
        "IP": userIp,
        "name": name,
        "value": value,
        "Counter": counter,
        "Date": todaysDatey,
        "timeStamp": TimeStamp,
        "DataOutputs": DataOutputs
    };

    database.update(jsonUpdate);
    counter++;
    
};



async function asyncLogParams(name, value, DataOutputs = '') {


    //get user IP and format to nice string
    let temp = await asyncGetIp();
    let userIp = await asyncToString(temp);

    let {ymdDate, timeStamp } = getDate();
    let valueCleaned = boolToInt(value);
    // console.log(valueCleaned);
    // userIp = '136-55-777-44'

    //setup Json string item in db
    const jsonSet = {};
        
        jsonSet[counter]  = {
            "IP": '',
            "name": '',
            "value": '',
            "Counter": '',
            "Date": '',
            "timeStamp": '',
            "DataOutputs":''
        };

    // //initialize this user
    if(counter < 1) {database.set(jsonSet)};

    
    logParamReal(name, valueCleaned, userIp, ymdDate, timeStamp, DataOutputs);
}

export default asyncLogParams;
