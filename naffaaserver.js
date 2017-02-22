var express = require('express');  //include express library
var app = express();           //create new express object


//set the static folder
app.use('/assets', express.static('assets'));
app.use('/', express.static('dist'));



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

//Listen to the dafulat port and IP
app.listen(3000,

    function() {

        console.log('Connected to port ' + ' 3000 ' + ' on IP ' + ' 192.168.0.135 ' )

    });
