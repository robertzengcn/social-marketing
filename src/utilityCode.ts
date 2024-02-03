import * as path from 'path';
console.log('Listening for messages...');
var fs = require('fs');
if(process.parentPort){
process.parentPort.on('message', (e) => {
    const port = e.ports[0];
 
    process.parentPort.postMessage({data: "Ready"});
    console.log("I m coming,do you find me？")
 
    port.on("message", (e) => {
        console.info("why not print it？", e.data)
        setTimeout(() => {
            port.postMessage(`I receive your message:${e.data}`)
        }, 2000)
 
    });
    port.start();
    port.postMessage({data: "Ready"});
});
}
fs.writeFile(path.join(__dirname,'newfile.txt'), 'Learn Node FS module', function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
});
while(1){
    console.log("I m coming,do you find me？")
    setTimeout(() => {
        console.log("I m coming,do you find me？")
    }, 2000)
}