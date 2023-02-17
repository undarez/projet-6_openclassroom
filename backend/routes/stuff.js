const express = require('express');
const router = express.Router();
// const app = require ('../app');

// appel de post pour authentification
router.post('/api/auth/signup', (req, res, next)=>{
    const utilisateur = new utilisateur({
        ...req.body
    })
    utilisateur.save()
    .then(()=> res.status(201).json({message:'un nouvel utilisateur cest inscrit sur le site'}))
    .catch(error => res.status(400).json({error}))
})

// appel de post pour les sauces
router.post('/', (req, res, next) => {
    // le delete supprime _id car mongoose genere automatiquement des id à la creation
    delete req.body._id;
    const thing = new thing({
        ...req.body
    });
    thing.save()
    .then(() => res.status(201).json({message:'une nouvelle sauce à été ajouté'}))
    .catch(error => res.status(400).json({error}))
});

// recupérer un thing specifique = sauce
router.get('/:id', (req, res, next) => {
    // req.params = est un objet qui contien des prompriétés des parametres de la requete ici la requete contient un objet avec la proprieter id
    thing.findone({ _id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .then(error => res.status(404).json({ error}));
});

// récupérer touts les things = sauces
router.get('/api/sauces', (req, res, next)=>{
    thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}));
});

// modifier le thing pour pouvoir modifier le prix ou meme la quantité de l'article par l'utilisateur
router.put ('/:id', (req, res, next) => {
    thing.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
    .then(()=> res.status(200).json({message: 'objet modifié'}))
    .catch(error => res.status(400).json({error}));
});

// supprimer un thing 
router.delete('/:id', (req, res, next)=>{
    thing.deleteOne({_id: req.params.id})
    .then(()=> res.status(200).json({message: 'objet supprimé'}))
    .catch(error => res.status(400).json({error}));
});

module.exports = router;