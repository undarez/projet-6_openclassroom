const express = require('express');
const app = express();

// import du router pour toute les demandes
const stuffRouter = require('./routes/stuff')
const userRouter = require('./routes/user')

// nous appelons app.use pour toutes les demandes effectuer vers api/sauces
app.use('/api/sauces', stuffRouter); 

const multer = require ('multer');
const upload = multer({});

// const thing = require('./models/thing');

// importer mongoose 
const mongoose = require ('mongoose');

mongoose.connect('mongodb+srv://chocolat800:stringfalse@cluster0.qzvcie7.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// fin import mongoose + declaration
const validator = require ('email-validator');
const { error } = require('console');

validator.validate("test@email.com");  //true

// ce app.use permet de signaler les autorisation

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
// dossier app/auth contien signup et login
app.use('/api/auth/signup', userRouter);
app.use('/api/auth/login', userRouter);




app.use((req, res, next)=>{
    res.json({message: 'lancement de la requête initialiser'})
    next()
});


// app.post ce trouve toujour au dessus de app.get


  
// app.use('/api/sauces', (req, res, next) => {
//     const TableSauces = [
//         {
//             _id: '',
//             title: '',
//             description: '',
//             imageUrl: '',
//             // toujour déclarer le montant en centimes
//             price: "",
//             userId: 'qsomihvqios',
//         }
//     ]
// })

app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' })
  next()
});


// app.post('/api/auth/signup', (req, res, next) => {
//     console.log(req.body);
//     res.status(201).json({
//         message: 'Objet créé !'
//     });
// });

module.exports = app;