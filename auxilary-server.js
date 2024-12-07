function logRequest(type, forwhat=null) {
    const now = new Date();
    const currentTime = now.toLocaleTimeString();
    if (forwhat) {
        console.log(`\n${currentTime}\n[Recieved a ${type} request for ${forwhat}]`);
    } else {
        console.log(`\n${currentTime}\n[Recieved a ${type} request]`);
    }
}
function confirmResponse() {
    console.log('Responded');
}

module.exports = { logRequest, confirmResponse }; 