const express = require('express');
const app = express();
const { logRequest, confirmResponse } = require('./auxilary-server')
const port = 5500;


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));


app.get('/api', (req, res) => {
    logRequest('GET', '/api');
    res.send({ serverResponse: '<p>Hello from the Server!</p>' });
    confirmResponse();
});

app.get('/get/newcharacter', (req, res) => {
    res.send('You got a new character!');
});


// Post to update
// Put 
// Delete


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


