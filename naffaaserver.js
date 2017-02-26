//!/usr/bin/env nodejs

var express = require('express');  //include express library
var bodyParser = require('body-parser');
var app = express();           //create new express object
var mongoDB = require('mongoose');
var Attendee = require('./attendee')


//setup body parser
app.use(bodyParser.json());

//setup mongo db connection
var mongoLocation = 'mongodb://127.0.0.1:27017'
mongoDB.connect(mongoLocation);






//set the static folder
app.use('/assets', express.static('assets'));
app.use('/', express.static('dist'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//Set default route from /public/html/index.html
app.get('/', function (req, res) {

    res.sendfile(__dirname +  '/index.html');

})


app.get('/location', function (req, res) {

    res.sendfile(__dirname +  '/location.html');

})

app.get('/contact', function (req, res) {

    res.sendfile(__dirname +  '/contact.html');

})


app.get('/register', function (req, res) {

    res.sendfile(__dirname +  '/dist/registration.html');

})



app.post('/api/register', function(req, res){

 if(!req.body || req.body.length === 0) {

    console.log('request body not found');
    res.send(400);

    }

    else {
        
        var msg2 = {

             "name" : "clear"

        }

        

        var Attendee_Data = req.body

        var attendees = new Attendee(Attendee_Data);

        attendees.save(function(err) {
        
              if (err) throw err;

              
        });

      //console.log(JSON.stringify(Attendee_Data));
      //console.log(JSON.stringify(msg2));
      res.send(msg2);
    
    }


})

//Listen to the dafulat port and IP
app.listen(3000,

    function() {

        console.log('Connected to port ' + ' 3000 ' )

    });
