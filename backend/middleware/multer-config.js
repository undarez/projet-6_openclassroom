const multer = require ('multer');
// créer un bibliotheque qui permet de modifier le type d'images
const MIMES_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// storage a besoin a de deux arguments
// on génère un fichier unique
// split permet de diviser la chaine de caractere
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename : (req, file,callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIMES_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

// exporter multer dans le disque mais bien signaler que ce sera un element unique a chaque utilisation.
module.exports = multer({ storage}).single('image');