// import bcrypt gerer les mot de pass et crypter
const bcrypt = require('bcrypt')
// import jsonwebtoken
const webToken = require ('jsonwebtoken')

// import du model user
const user = require('../models/users_model')

exports.signup = (req, res, next) => {
    //  hash crypt le mot de pass et 10 veut dire que le hash fait 10 tour ce qui sécurise le mot de pass et crypte
    bcrypt.hash(req.body.password, 10)
    .then(hash =>{
        const user = new user({
            email: req.body.email,
            password: hash
        });
        user.save()
        // 201 => création de ressource
        .then(() => res.status(201).json({message: ' Utilisateur créé !!'}))
        .catch(error => res.status(400).json({error}));
    })                            //500 erreur serveur
    .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    user.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: webToken.sign(
                            { userId: user._id},
                            // chaine de caractere secrete temporaire
                            'RAMDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };