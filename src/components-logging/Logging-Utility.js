

// export default async function logUtility() {
    
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
// }

export {asyncGetIp, getDate};