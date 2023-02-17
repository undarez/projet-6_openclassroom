const users = require ('../models/users_model')

exports.createThing = (req, res, next) => {
    const utilisateur = new utilisateur({
        ...req.body
    })
    utilisateur.save()
    .then(()=> res.status(201).json({message:'un nouvel utilisateur cest inscrit sur le site'}))
    .catch(error => res.status(400).json({error}))
}
