// Includes
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// DB Init
mongoose.connect('mongodb://localhost/students');   // Connexion à la base
var Student = mongoose.model('student', { name: String, first_name: String, email: String });

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
    //POST
app.post('/', function (req, res) {
    var bob = new Student({ name: 'bob', first_name : "Sponge", email : "sponge.bob@square.com" });
    bob.save(function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('meow');
        res.end();
      }
    });
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
