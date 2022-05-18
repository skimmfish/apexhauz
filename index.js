const path = require('path');
const express = require('express');
const cors = require('cors');
var http = require('http');
const mysql = require('mysql');
const morgan = require('morgan');
require('dotenv').config();
const bodyParser = require('body-parser');

//creating an express framework app object
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

//declaring heh port number as a constant
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));


//importing all the route files into the main container
require("./src/routes/property.routes.js")(app);
require("./src/routes/user.routes.js")(app);
//require("./src/routes/reports.routes.js")(app);


app.get('/', (req,res,next)=>{
res.json({message: "Welcome to ApexHauz Properties"});
res.send('I connected to database');
});


app.listen(PORT, ()=>{
console.log(`Apexhauz API v1 running on port ${PORT}`);
});
