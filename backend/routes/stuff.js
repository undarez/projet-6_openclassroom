const express = require('express');
const auth = require('../middleware/auth');

// multer nous permet de gerer les fichier entrant dans les requetes HTTP
const multer = require ('../middleware/multer-config')
// router est la variable qui appel le fichier router pour que l'on puisse exporter toute les demande 
const router = express.Router();
const sauceCtrl = require('../controller/sauce');
const likeCtrl = require('../controller/likes')

// appel de post pour authentification et de stuff controle modifything
router.post('/', auth, multer, sauceCtrl.createThing);
router.put('/:id', auth,multer, sauceCtrl.modifyThing);
router.delete('/:id', auth, sauceCtrl.deleteThing);
router.get('/:id', auth, sauceCtrl.getOneThing);
router.get('/', auth, sauceCtrl.getFindThing);
router.post('/:id/like', auth, likeCtrl.voteSauce);

module.exports = router;