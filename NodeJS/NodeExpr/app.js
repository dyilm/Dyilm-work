// Includes
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

// DB Init
mongoose.connect('mongodb://localhost/students');   // Connexion à la base
var Student = mongoose.model('student', { name: String, first_name: String, email: String });
mongoose.Promise = global.Promise; //Error message 4 promises

// App init
var app = express();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(methodOverride('_method')); // override with POST having ?_method=DELETE

// Body Parser
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Session init
app.use(session({
  secret: 'dyilm',
  resave: false,
  saveUninitialized: true,
  cookie: { }
}))

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
  res.render('test-pug', { v_itsABoolean: true });
});

app.get('/pug-2', function (req, res) {
  res.render('test-pug-2', { v_paramHTML: 'coucou <strong>TOI</strong>' });
});

/* Session */
app.get('/setname', function (req, res) {
    var sess = req.session;
    sess.dyilmname = 'Yilmaz';
    console.log('set session');
    res.end();
});
app.get('/getname', function (req, res) {
    var sess = req.session;
    res.locals.se
    console.log('Session: '+sess.dyilmname);
    res.send(sess.dyilmname);
});

/* People */
    // GET
app.get('/people', function (req, res) {
    res.render('get-people', {});
});
app.get('/people/get', function (req, res) {
    res.json(req.query);
});
    // POST
app.post('/people/post', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  console.log(req.body);
  res.json(req.body);
})
