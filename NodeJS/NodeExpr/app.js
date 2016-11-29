// Includes
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// DB Init
mongoose.connect('mongodb://localhost/students');   // Connexion à la base
var Student = mongoose.model('student', { name: String, first_name: String, email: String });
mongoose.Promise = global.Promise; //Error message 4 promises

// App init
var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

// Listen to 3000 port
var server = app.listen(3000,function(){
  console.log('Server NodeJS started');
});

/* Home */
    //GET
app.get('/', function (req, res) {
    Student.find(null, function (err, students) {
        if (err) { throw err; }
        res.render('index', { v_students: students })
    });
});
    //POST
app.post('/', function (req, res) {
    var bob = new Student({ name: 'bob', first_name : "Sponge", email : "sponge.bob@square.com" });
    bob.save(function (err) {
      if (err) {
        throw err;
      } else {
        console.log('Etudiant ajouté');
        res.end();
      }
    });
});
    //PUT
app.put('/', function (req, res) {
    Student.findOneAndUpdate({name: 'bob'}, {name: 'Bobby'}, function (err, stud) {
        if(err) { throw err; }
        console.log('Etudiant modifié');
        res.end();
    })
});
    //DELETE
app.delete('/', function (req, res) {
    res.json({
        "bien" : "bien?"
    });
});

/* Test Pug */
app.get('/pug', function (req, res) {
  res.render('test-pug', { v_itsABoolean: true })
});
app.get('/pug-2', function (req, res) {
  res.render('test-pug-2', { v_paramHTML: 'coucou <strong>TOI</strong>' })
})
