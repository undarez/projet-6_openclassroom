const mongoose = require ('mongoose');


// créer un objet qui permet de configurer les donnée obligatoire a renseigner pour que cela fonctionne donc c'est un model
// model pour les sauces
const thingschema = mongoose.Schema({
    userId: { type: String, required: true},
    name: { type: String, required: true},
    manufacturer: { type: String, required: true},
    description: { type: String, required: true},
    mainPepper: { type: String, required: true},
    imageUrl: { type: String, required: true},
    heat: { type: Number, required: true},
    likes: { type: Number, required: true},
    dislikes: { type: Number, required: true},
    userLiked: { type: [String], required: true}, // — tableau des identifiants des utilisateurs
    // qui ont aimé (= liked) la sauce
    userDisliked: { type: [String], required: true}, //  — tableau des identifiants des
    // utilisateurs qui n'ont pas aimé (= disliked) la sauce
    
    
});

module.export = mongoose.model('thing', thingschema)
