const User = require('../models/users_model')
const flatted = require('flatted')
// import de fs = file systeme (Il nous donne accès aux fonctions qui nous permettent de modifier le système de fichiers, y compris aux fonctions permettant de supprimer les fichiers.)
const helmet = require('helmet')
const fs = require('fs')
const sauce = require('../models/object-model');

// appel de post pour authentification et création d'objet
//=======================creation======================
exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.sauce);
    delete thingObject._id;
    //  supprimer le userId car on ne doit poas faire confiance au client on c'est jamais si cet utilisateur a utiliser des donner d'une personne
    delete thingObject._userId;
    const thing = new sauce({
        ...thingObject,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log(req.file.filename)
    helmet()
    thing.save()
        .then(() => { res.status(201).json({ message: 'objet enregistrer !' }) })
        .catch(error => { res.status(400).json(error) })
};

//=======================modif======================
// modifier le thing pour pouvoir modifier le prix ou meme la quantité de l'article par l'utilisateur

exports.modifyThing = (req, res, next) => {
    //si l'objet existe
    const thingObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    // suppimer userId pour eviter que un utilisateur utilise des donner d'une autre personne existante .

    //=======================gere modif ou pas les articles======================
    delete thingObject._userId;
    sauce.findOne({ _id: req.params.id })
        .then((thing) => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non autorisé' });
            } else {

                sauce.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
}

// supprimer l'objet de l'utilisateur qui le demande.
exports.deleteThing = (req, res, next) => {
    sauce.findOne({ _id: req.params.id })
        .then(thing => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé' })
            } else {
                // supprimer l'objet et supprimer l'image du systeme du fichier grace au split qui prend le premier élement du tableau
                const filename = thing.imageUrl.split('/images/')[1];
                // grace à l'acces au dossier unlink permet de dissosier l'image pour supp l'objet
                fs.unlink(`images/${filename}`, () => {
                    sauce.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Objet supprimé !' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
}
//=======================suppression======================
// supprimer un thing 
exports.deleteThing = (req, res, next) => {
    sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'objet supprimé' }))
        .catch(error => res.status(400).json({ error }));
};

//=======================one sauce======================
// recupérer un thing specifique = sauce
exports.getOneThing = (req, res, next) => {
    // req.params = est un objet qui contien des prompriétés des parametres de la requete ici la requete contient un objet avec la proprieter id
    sauce.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};
//=======================all sauces======================
// récupérer touts les things = sauces
exports.getFindThing = (req, res, next) => {
    sauce.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};