// Setup empty JS object to act as endpoint for all routes
projectData = {};
const data = [];
// Require Express to run server and routes
const express = require('express');
const app = express();

//Start up an instance of app


/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { response } = require('express');
app.use(cors());
// Initialize the main project folder
app.use(express.static('root'));

// Setup Server
const port = 7600;
const server = app.listen(port, listening);

function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);

};
// ROUTES

//GET
app.get("/", function(req, res) {
    res.send(data); //giving the array of objects
});

//POST
app.post('/', (req, res) => {
    projectData = req.body;
    data.unshift(projectData); // instead of push I used unshift to put last entry inn front of others in array. 
    //That was easiest way to reach that entry so we can appand it inside HTML!
    console.log(projectData);
    console.log("I've got the request");
    res.send("message:Post received");
});