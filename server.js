// Imports
const express = require('express');
const app = express();
const { logRequest, confirmResponse, getMediaFiles } = require('./auxilary-server')


// Variables that will be used throughout the server
const port = 5500;

// Default actions for each request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

////
// Get Requests
////
app.get('/api', (req, res) => {
    logRequest('GET', '/api');
    res.send({ serverResponse: '<p>Hello from the Server!</p>' });
    confirmResponse();
});

app.get('/get/mediafiles', async (req, res) => {
    logRequest('GET', '/get/mediafiles');
    const mediaFiles = await getMediaFiles();
    console.log(mediaFiles)
    res.send({ mediaFiles });
    confirmResponse();
});


// Post to update
// Put 
// Delete


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


