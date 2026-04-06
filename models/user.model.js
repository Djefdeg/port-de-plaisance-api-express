const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * Schéma pour un user
 * @param {Object} req
 * @param {Object} res
 */
const userSchema = new mongoose.Schema({
    userName:{type : String, trim:true, required:true, unique:true},
    email: {type : String, trim:true, lowercase:true, required:true, unique:true, 
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez remplir un email valide.']}, 
    password:{type : String, trim:true, required: true, minlength: [8, 'Le mot de passe doit contenir un minimum de 8 caracteres.']}   
},
{timestamps : true}
);
//On hashe le mot de passe uniquement s'il a été modifié (créé implique modifié aussi)
userSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return;
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
});
module.exports = mongoose.model('User',userSchema);