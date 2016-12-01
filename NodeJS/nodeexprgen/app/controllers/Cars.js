const models = require('../models');

var Cars = {
    /**
     * @param req La requête entrante
     * @param res Ce qui est renvoyé au navigateur
     */
    index: function(req, res) {
        models
            .Car
            .findAll()
            .then(function(cars) {
                res.render('cars/index', {
                    cars: cars
                });
            });

    },
    create_get: function(req, res) {
        res.render('cars/create')
    },
    create_post: function(req, res) {
        if (req.body.brand && req.body.km) {
            var newCar = {
                brand: req.body.brand,
                km: req.body.km
            };

            models.Car.create(newCar).then(function(car) {

            })
        }
    },
    update: function(req, res) {
        if (req.params.id && req.body.brand && req.body.km) {
            models.Car.findAll({
                where: {
                    id: req.params.id
                }
            }).then(function (cars) {
                cars.brand = req.body.brand;
                cars.km = req.body.km;

                task.save().then(function() {
                    res.redirect('/cars/')
                })
            });
        }
    },
    delete: function(req, res) {
        res.send('Delete users with id: ' + req.params.id);
    }
};

module.exports = Cars; // L'exportation permet de rendre disponible ce fichier ailleurs grâce au require()
