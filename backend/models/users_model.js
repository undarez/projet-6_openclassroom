const mongoose = require ('mongoose');

// mogoose-unique-validator permet que deux utilisateur n'utilise pas la meme adresse email pour ce connecter
const uniqueValidator = require('mongoose-unique-validator')

// créer un model d'utilisateur 
const utilisateurschema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

utilisateurschema.plugin(uniqueValidator);

module.export = mongoose.model('thing', utilisateurschema)