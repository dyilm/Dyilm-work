// Includes
const express = require('express');
const path = require('path');

// App init
var app = express();

// Listen to 3000 port
var server = app.listen(3000,function(){
  console.log('Server started');
});

/* Home */
    //GET
app.get('/', function (req, res) {
    res.send('Homepage');
});
    //PUT
app.put('/', function (req, res) {
    res.sendFile(path.join(__dirname,'index.html'));
});
    //DELETE
app.delete('/', function (req, res) {
    res.json({
        "bien" : "bien?"
    });
});
