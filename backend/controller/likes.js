const router = require('../app');
const thingSauce = require('../models/sauce-model');
// const flatted = require('flatted')
const { parse, stringify } = require('flatted');
const { updateOne } = require('../models/sauce-model');

// utilisation de requete $inc

//les methode que l'on va utiliser que je n'es jamais vu 
//.include (JS)
//$inc , $push, $pull (mongoodb)

//on export la route de votesauce
exports.voteSauce = (req, res, next) => {
    //principe de base toujours ajouter le .then et catch
    //params transform _id en id
    thingSauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            console.log("contenue de sauce promise")
            console.log(sauce)
            //si l'utilisateur ajoute un like alors like = 1 (likes = +1)
            //utilisation de switch pour les cas possible de likes et disliked

            switch (req.body.like) {

                case 1:

                    // case 1:
                    // si usersliked de thing est false && si likes est ===1 on appel include car il faut aller verifier si userId est dans le tableau 
                    //userId n'est pas dans le tableau de usersliked
                    if (!sauce.usersLiked.includes(req.body.userId)) {
                        //mise a jour sauce de mongodb
                        thingSauce.updateOne(
                            { _id: req.params.id },
                            {                   //push pousse l'élément
                                $inc: { likes: 1 },
                                $push: { usersLiked: req.body.userId }
                            }
                        )
                            .then(() => { res.status(201).json({ message: 'ajout de 1 like' }) })
                            .catch(error => res.status(400).json({ error }));

                    }
                    break;
                //si pas de vote alors 0 likes = 0
                //si userliked est true && usersdisliked alors likes est === -1 donc on inc de -1


                //likes = -1 donc dislike vaux +1 

                case -1:
                    if (!sauce.usersDisliked.includes(req.body.userId)) {
                        //mise a jour sauce de mongodb
                        thingSauce.updateOne(
                            { _id: req.params.id },
                            {                   //pull supprime l'élément
                                $inc: { dislikes: +1 },
                                $push: { usersDisliked: req.body.userId }
                            }
                        )
                            .then(() => { res.status(201).json({ message: 'jajoute un -1' }) })
                            .catch(error => res.status(400).json({ error }));

                    }
                    break;

                // apres un vote qui es de -1 et que lon vote pouce bleu alors c'est 0 
                case 0:
                    
                    if (sauce.usersDisliked.includes(req.body.userId)) {
                        thingSauce.updateOne(
                            { _id: req.params.id },
                            {                   //pull supprime l'élément
                                $inc: { dislikes: -1 },
                                $pull: { usersDisliked: req.body.userId }
                            }
                        )
                            .then(() => { res.status(201).json({ message: 'on enleve 1 vote ' }) })
                            .catch(error => res.status(400).json({ error }));
                    }

                    if (sauce.usersLiked.includes(req.body.userId)) {
                        //mise a jour sauce de mongodb
                        thingSauce.updateOne(
                            { _id: req.params.id },
                            {                   //pull supprime l'élément
                                $inc: { likes: -1 },
                                $pull: { usersLiked: req.body.userId }
                            }
                        )
                            .then(() => { res.status(201).json({ message: 'neutre' }) })
                            .catch(error => res.status(400).json({ error }));
                    }
                    break;
            }
        })
        .catch(error => res.status(400).json({ error }));
}