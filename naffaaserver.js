#!/usr/bin/env nodejs

var express = require('express');             //include express library
var bodyParser = require('body-parser');      //get the lib for body-parser  
var app = express();                          //create new express object
var mongoDB = require('mongoose');            //import mongoose driver
var Attendee = require('./attendee');          //import attendee model

//setup body parser
app.use(bodyParser.json());

//setup mongo db connection
var mongoLocation = 'mongodb://127.0.0.1:27017'
mongoDB.connect(mongoLocation, function(error){
      if(error){

          console.log(error);
      }

      else{
          console.log ("Db connected");
      }

});

//set the static folder
app.use('/assets', express.static('assets'));
app.use('/', express.static('dist'));
app.use('/', express.static('speaker'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Set default route from /public/html/index.html
app.get('/', function (req, res) {

    res.sendfile(__dirname +  '/index.html');

})

//Route for location
app.get('/location', function (req, res) {

    res.sendfile(__dirname +  '/location.html');

})

//Route for contact 
app.get('/contact', function (req, res) {

    res.sendfile(__dirname +  '/contact.html');

})

//Route for contact 
app.get('/speaker', function (req, res) {

    res.sendfile(__dirname +  '/speaker/speaker.html');

})

//Route for register
app.get('/register', function (req, res) {

    res.sendfile(__dirname +  '/dist/registration.html');

})

//Register Post route
app.post('/api/register', function(req, res){

 if(!req.body || req.body.length === 0) {

    console.log('request body not found');
    res.send(400);

    }

    else {

        var Attendee_Data = req.body            //Extract data from request body

        var attendees = new Attendee(Attendee_Data);   //transform data to the db model

        //Save new data
        attendees.save(function(err) {

              if (err) {  throw err; }

             else{ console.log("create file"); }
        });


        res.send(200);  //send 200 code for success

    }
});


//Route for register
app.get('/api/data', function (req, res) {

    res.sendfile(__dirname +  '/mydata.json');
    

})

//get the requested data from the database
app.get('/api/register', function (req, res) {


   Attendee.find({}, function(err, attende){

         res.send(attende);
            

   })
    
   

})

//Listen to the dafulat port and IP
app.listen(3000,

    function() {

        console.log('Connected to port ' + ' 3000 ' )

    });
