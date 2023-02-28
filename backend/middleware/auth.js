const webToken = require ('jsonwebtoken');

// ce middlewarre permet d'extraire les info de l'user contenue dans le token pour qu'il soit utiliser
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
                                    //.verify permet de verifier la validité d'un token
        const decodedToken = webToken.verify(token, 'RAMDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {
            userId:userId
        };
        next()
    } catch(error) {
        res.status(401).json({error});
    }
};