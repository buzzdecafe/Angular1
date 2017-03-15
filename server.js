'use strict';
var express = require('express');
var jsonServer = require('json-server');
var server = jsonServer.create();
var path = require('path');
var jsonRouter = jsonServer.router(path.join(__dirname, 'db.json'))
var middlewares = jsonServer.defaults()
server.use(middlewares)

var bodyParser = require('body-parser');
var app = express();
var router = express.Router();

var dist = __dirname + '/dist';

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies



app.post('/api/save', function (req, res) {
    res.send({
        view:'mars',
        message: 'ok'
    });
});

//app.use('/api', jsonRouter);

app.use('/', express.static(dist));
app.get('*', function (req, res) {
  res.sendFile(path.join(dist + '/index.html'));
});

app.listen(3000, function () {
  console.log("Listening on 3000...")
});


function getUser(id){

  


}