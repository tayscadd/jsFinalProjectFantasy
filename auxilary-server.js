const fs = require('fs/promises');
const path = require('path');
const mediaDirectoryPath = path.join(__dirname, 'media/images');

async function getFiles(path) {
    let whatgetsreturned = await fs.readdir(path, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            return file;
        });
    })
    return whatgetsreturned;
}

async function getMediaFiles() {
    let mediaFiles = await getFiles(mediaDirectoryPath);
    return mediaFiles;
}


function logRequest(type, forwhat=null) {
    const now = new Date();
    const currentTime = now.toLocaleTimeString();
    if (forwhat) {
        console.log(`\n${currentTime}\n[Recieved a ${type} request for ${forwhat}]`);
    } else {
        console.log(`\n${currentTime}\n[Recieved a ${type} request]`);
    }
}
function confirmResponse(type, forwhat=null) {
    console.log(`[Responded to a ${type} request for ${forwhat}]`);
}

module.exports = { logRequest, confirmResponse, getMediaFiles }; 