const User = require('../models/User');

var Users = {
    /**
     * @param req La requête entrante
     * @param res Ce qui est renvoyé au navigateur
     */
    index: function(req, res) {
        User.find(null, function (err, users) {
            if (err) { throw err; }
            res.render('users/index', {
                "title": "nodeexprgen - Users",
                'v_users': users,
                'islogged' : req.session.dlogged
            });
        });

    },
    login_get: function (req, res) {
        res.render('users/login');
    },
    login_post: function (req, res) {
        if(req.body.username && req.body.password){

            User.find({
                'username': req.body.username,
                'password': req.body.password
            }, function (err, users_find) {
                if (err) return handleError(err);

                if(users_find.length> 0){
                    req.session.logged = true;
                    res.redirect('/users');
                }else {
                    res.redirect('/users/login')
                }

                res.end();
            });
        }
    },
    subscribe: function(req, res) {
        res.render('users/create');
    },
    create: function(req, res) {
        if(req.body.username && req.body.password && req.body.email){
            const newUser = new User({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            });

            newUser.save(function (err) {
                if(err) console.log(err);
                res.redirect('/users/subscribe')
            });

        }
    },
    update: function(req, res) {
        res.send('PUT -- Update users with id: ' + req.params.id);
    },
    delete: function(req, res) {
        res.send('Delete users with id: ' + req.params.id);
    }
};

module.exports = Users; // L'exportation permet de rendre disponible ce fichier ailleurs grâce au require()
