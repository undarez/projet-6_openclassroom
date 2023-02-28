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
    likes: { type: Number, default:0 },
    dislikes: { type: Number, default: 0} ,
    usersLiked: { type: [String], required: true}, // — tableau des identifiants des utilisateurs
    // qui ont aimé (= liked) la sauce
    usersDisliked: { type: [String], required: true}, //  — tableau des identifiants des
    // utilisateurs qui n'ont pas aimé (= disliked) la sauce
},
//ajout de timestamps =heure a la quelle l'objet a ete créer methode de mongodb 
{
    timestamps: true,
}
);
module.exports = mongoose.model('object-model', thingschema)
