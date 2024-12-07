// Imports
const express = require('express');
const app = express();
const { logRequest, confirmResponse, getMediaFiles, generateRandomCharacter } = require('./auxilary-server')


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
    confirmResponse('GET', '/api');
});

app.get('/get/mediafiles', async (req, res) => {
    logRequest('GET', '/get/mediafiles');
    const mediaFiles = await getMediaFiles();
    res.send({ mediaFiles });
    confirmResponse('GET', '/get/mediafiles');
});

app.get('/get/newcharacter', (req, res) => {
    logRequest('GET', '/get/newcharacter');
    const character = generateRandomCharacter();
    res.send({ character });
    confirmResponse('GET', '/get/newcharacter');
})


// Post to update
// Put 
// Delete


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


