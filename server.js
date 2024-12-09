// Imports
const express = require('express');
const app = express();
const { logRequest, confirmResponse, getMediaFiles, generateRandomCharacter, getCharacterJobs, deleteJob, editJob, createJob, getSpeciesList, deleteSpecies, editSpecies, createSpecies } = require('./auxilary-server')


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

app.get('/get/portraits', async (req, res) => {
    logRequest('GET', '/get/portraits');
    const mediaFiles = await getMediaFiles();
    res.send({ mediaFiles });
    confirmResponse('GET', '/get/portraits');
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

app.get('/get/species', (req, res) => {
    logRequest('GET', '/get/species');
    const species = getSpeciesList();
    res.send({ species });
    confirmResponse('GET', '/get/species');
});
app.get('/get/species/:name', (req, res) => {
    logRequest('GET', `/get/species/${req.params.name}`);
    const species = getSpeciesList().find(species => species.name === req.params.name);
    res.send({ species });
    confirmResponse('GET', `/get/species/${req.params.name}`);
});


////
// Put Requests
////
app.put('/put/class/update', (req, res) => {
    logRequest('PUT', '/put/class/update');
    let response = editJob(req.body);
    if (response) {
        res.send({ serverResponse: 'Class Updated' });
        console.log('Success')
    } else {
        console.log('Failed')
        res.status(400).send({ serverResponse: 'Failed to update class' });
    }
    confirmResponse('PUT', '/put/class/update');
});
app.put('/put/class/create', (req, res) => {
    logRequest('PUT', '/put/class/create');
    let response = createJob(req.body.JOB);
    if (response) {
        res.send({ serverResponse: 'Class Updated' });
        console.log('Success')
    } else {
        console.log('Failed')
        res.status(400).send({ serverResponse: 'Failed to update class' });
    }
    confirmResponse('PUT', '/put/class/create');
});
app.put('/put/specie/update', (req, res) => {
    logRequest('PUT', '/put/species/update');
    let response = editSpecies(req.body);
    if (response) {
        res.send({ serverResponse: 'Species Updated' });
        console.log('Success')
    } else {
        console.log('Failed')
        res.status(400).send({ serverResponse: 'Failed to update Species' });
    }
    confirmResponse('PUT', '/put/species/update');
});
app.put('/put/specie/create', (req, res) => {
    logRequest('PUT', '/put/species/create');
    console.log(req.body)
    let response = createSpecies(req.body.SPECIES);
    if (response) {
        res.send({ serverResponse: 'Species Updated' });
        console.log('Success')
    } else {
        console.log('Failed')
        res.status(400).send({ serverResponse: 'Failed to update Species' });
    }
    confirmResponse('PUT', '/put/species/create');
});

app.put('/log', (req, res) => {
    console.log("[CLIENT MESSAGE]: " , req.body.msg)
});

////
// Delete Requests
////
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
app.delete('/delete/specie', async (req, res) => {
    logRequest('DELETE', `/delete/specie (${req.body.name})`);
    let success = await deleteSpecies(req.body.name);
    if (!success) {
        res.status(400).send({ serverResponse: 'Failed to delete species' });
    } else {
        res.send({ serverResponse: 'Species Deleted' });
    }
    confirmResponse('DELETE', '/delete/specie');
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


