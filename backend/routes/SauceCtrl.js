const express = require('express');
const auth = require('../middleware/auth');

// multer nous permet de gerer les fichier entrant dans les requetes HTTP
const multer = require ('../middleware/multer-config')
// router est la variable qui appel le fichier router pour que l'on puisse exporter toute les demande 
const Sauce = express.Router();
const sauceCtrl = require('../controller/sauce');
const likeCtrl = require('../controller/likes')

// appel de post pour authentification et de sauce controle modifything
Sauce.post('/', auth, multer, sauceCtrl.createSauce);
Sauce.put('/:id', auth,multer, sauceCtrl.modifySauce);
Sauce.delete('/:id', auth, sauceCtrl.deleteSauce);
Sauce.get('/:id', auth, sauceCtrl.getOneSauce);
Sauce.get('/', auth, sauceCtrl.getFindSauce);
Sauce.post('/:id/like', auth, likeCtrl.voteSauce);

module.exports = Sauce;


// post = poster une nouvelle sauce
// put = mettre donc modifier les infos de la sauce qui à été créer
// delete = supprimer la sauce qui est créer
// get = obtenir donc obtenir les info des sauces 