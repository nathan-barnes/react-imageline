// const firebase = window.firebase-database;
import React from 'react';
import asyncGetIp from './getIp'

const firebase = window.firebase;
// import app from 'firebase-app';
// import firebase from 'firebase';



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

//helper functions
async function asyncToString(string) {
    const regex = /\./g;
    const result = await string.replace(regex, '-');
    return result;
}

//sudo unique ID for session



function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 const uniquId =  makeid(5);



// Get a reference to the database service
var database = firebase.database().ref(uniquId);

database.push();


//fix for Json replace variables
var counter = 0




async function asyncLogParams(id, value) {

    //get user IP and format to nice string
    var temp = await asyncGetIp();
    var userIp = await asyncToString(temp);

    userIp = '136-55-777-22'
    console.log(userIp);

    //setup Json string item in db
    const jsonSet = {};
        // const iterationsSet = {};
        // iterationsSet[userIp]  = {
        //     "id": '',
        //     "value": 0
        // };
        // jsonSet[counter] = iterationsSet;
        
        jsonSet[counter]  = {
            "IP": '',
            "id": '',
            "value": 0
        };

    // //initialize this user
    if(counter < 1) {database.set(jsonSet)};

    function logParamReal(id, value) {
        // var database = firebase.database().ref(id)
    
        // get user IP address also added ip-address libary.
        const jsonUpdate = {};
        // const iterations = {};
        // iterations[userIp]  = {
        //     "id": id,
        //     "value": value
        // };
        // jsonUpdate[counter] = iterations;
        
        jsonUpdate[counter]  = {
            "IP": userIp,
            "id": id,
            "value": value
        };
    
        // database.set({
        database.update(jsonUpdate);
    
        counter++;
    };

    
    logParamReal(id, value);
    
}
// asyncLogParams();

// export default logParamReal;
export default asyncLogParams;
