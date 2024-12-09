// Imports
const express = require('express');
const app = express();
const { logRequest, confirmResponse, getMediaFiles, generateRandomCharacter, getCharacterJobs, deleteJob, editJob } = require('./auxilary-server')


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

app.get('/get/newcharacter', async (req, res) => {
    logRequest('GET', '/get/newcharacter');
    const character = await generateRandomCharacter();
    console.log(`${character.name}, the ${character.species.name} ${character.job.name}. (ID: ${character.id})`);
    res.send({ character });
    confirmResponse('GET', '/get/newcharacter');
})

app.get('/get/classes', (req, res) => {
    logRequest('GET', '/get/classes');
    const character_classes = getCharacterJobs();
    res.send({ character_classes });
    confirmResponse('GET', '/get/classes');
});

app.get('/get/class/:name', (req, res) => {
    logRequest('GET', `/get/class/${req.params.name}`);
    const character_class = getCharacterJobs().find(job => job.name === req.params.name);
    res.send({ character_class });
    confirmResponse('GET', `/get/class/${req.params.name}`);
}); 

app.put('/put/class', (req, res) => {
    logRequest('PUT', '/put/class');
    let response = editJob(req.body);
    if (response) {
        res.send({ serverResponse: 'Class Updated' });
        console.log('Success')
    } else {
        console.log('Failed')
        res.status(400).send({ serverResponse: 'Failed to update class' });
    }
    confirmResponse('PUT', '/put/class');
});

app.delete('/delete/class', async (req, res) => {
    logRequest('DELETE', `/delete/class (${req.body.name})`);
    let success = await deleteJob(req.body.name);
    if (!success) {
        res.status(400).send({ serverResponse: 'Failed to delete class' });
    } else {
        res.send({ serverResponse: 'Class Deleted' });
    }
    confirmResponse('DELETE', '/delete/class');
});


// Post to update
// Put 
// Delete


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


