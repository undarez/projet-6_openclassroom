const express = require ('express');
const router = express.Router()
const userCtrl = require('../controller/User');

// on utilie les post car le fron va envoyer les email et mot de pass
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;