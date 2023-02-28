const express = require('express');
const auth = require('../middleware/auth');

// multer nous permet de gerer les fichier entrant dans les requetes HTTP
const multer = require ('../middleware/multer-config')
// router est la variable qui appel le fichier router pour que l'on puisse exporter toute les demande 
const router = express.Router();
const stuffCtrl = require('../controller/router');
const likeCtrl = require('../controller/likes')

// appel de post pour authentification et de stuff controle modifything
router.post('/', auth, multer, stuffCtrl.createThing);
router.put('/:id', auth,multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.get('/', auth, stuffCtrl.getFindThing);
router.post('/:id/like', auth, likeCtrl.voteSauce);

module.exports = router;