var express = require('express');
var router = express.Router();

var cars = require('../controllers/Cars'); // Nous allons récuperer notre controlleur fait précédement


/* GET Récupère la liste des utilisateurs */
router.get('/', cars.index);

/* POST Création d'un nouvel utilisateur */
router.get('/create', cars.create_get);
router.post('/', cars.create_post);

/* PUT Modification d'un utilisateur */
router.put('/:id(\\d+)', cars.update);

/* DELETE Suppression d'un utilisateur */
router.delete('/:id(\\d+)', cars.delete);

module.exports = router;
