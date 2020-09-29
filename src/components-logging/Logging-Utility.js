

    
function getDate() {
    const date = new Date();
    const ymdDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const hmsTime = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    const timeStamp = date.getTime();


    return {ymdDate, hmsTime, timeStamp};
}



async function asyncGetIp() {
    var ip = fetch('https://api.ipify.org/?format=json')
    .then(results => results.json())
    // .then(data => {console.log( toString(data.ip).replace('.', '-'))});
    .then(data => {return data.ip});
    return await ip;
}


//sudo unique ID for session
function makeid(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 //helper functions for fixing strings for database
async function asyncToString(string) {
    const regex = /\./g;
    return await string.replace(regex, '-');
    // return result;
}

export {asyncGetIp, getDate, makeid, asyncToString};