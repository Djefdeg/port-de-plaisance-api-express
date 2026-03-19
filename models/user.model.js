const mongoose = require('mongoose');

//Schema pour un utilisateur
const userSchema = new mongoose.Schema({
    userName:{type : String, required:true, unique:true},
    email: {type : String, required : true, unique:true, 
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez remplir un email valide.']}, 
    password:{type : String, required: true, minlength: [8, 'Le mot de passe doit contenir un minimum de 8 caracteres.']}   
},
{timestamps : true}
);

module.exports = mongoose.model('User',userSchema);