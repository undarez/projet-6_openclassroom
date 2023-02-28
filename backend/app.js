const express = require('express');
require ('dotenv').config({path:"../.env"});
const app = express();
// import de cors qui permet de facilité la communication entre le back et le front qui ont des orrigine diffs.
const cors = require('cors');

// import du router pour toute les demandes
const stuffRouter = require('./routes/stuff')
const userRouter = require('./routes/user')
const path = require('path')

app.use (cors())
app.use(express.json())
const multer = require ('multer');
const upload = multer({});


// console.log(process.env.MONGODB_URI)
// importer mongoose 
const mongoose = require ('mongoose');
mongoose.set('strictQuery', true);

// adress serveur monbodb
mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// ce app.use permet de signaler les autorisation
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
// dossier app/auth contien signup et login
app.use('/api/auth', userRouter);
// nous appelons app.use pour toutes les demandes effectuer vers api/sauces
app.use('/api/sauces', stuffRouter); 

// dossier images pour servir des fichier static qui appartien a express
//concaténer le dossier image pour que le chemin ce face entierrement 
app.use('/images/', express.static(path.join(__dirname, 'images')))


module.exports = app;