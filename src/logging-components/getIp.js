

 function  asyncGetIp() {
    var ip = fetch('https://api.ipify.org/?format=json')
    .then(results => results.json())
    // .then(data => {console.log( toString(data.ip).replace('.', '-'))});
    .then(data => {return data.ip});
    return ip;
}

export default asyncGetIp;