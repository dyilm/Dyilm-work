// Includes
var express = require('express');

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
})