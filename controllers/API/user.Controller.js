const User = require ('../../models/user.model');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const blacklist = require('../../middlewares/tokenBlacklist');

/**
 * Afficher la liste des utilisateurs
 * @param {Object} req
 * @param {Object} res
 */
exports.getAllUsers = async (req,res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    }catch (error){
         console.error(error);
         return res.status(500).json({ message: 'internal_server_error' });
    }
};

/**
 * Afficher un user déterminé par son email.
 * @param {Object} req
 * @param {Object} res
 */
exports.getGivenUser = async(req,res)=>{
    const email = req.params.email;
    try{
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(404).json({message:'user_not_found'});
        }
        return res.status(200).json(user);
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: 'internal_server_error' });
    }
};

/**
 * Créer un nouvel utilisateur
 * @param {Object} req
 * @param {Object} res
 */
exports.createUser = async(req,res) => {
   
    let userBuffer ={
        userName:req.body.userName,
        email:req.body.email,
        password:req.body.password
    };
    try {
        if (!req.body.userName || !req.body.email || !req.body.password) {
          return res.status(400).json({ message: 'Missing required fields' });
          } 
        let newUser = await User.create(userBuffer);
        return res.status(201).json(newUser);
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: 'internal_server_error' });
    }
};

/**
 * Modifier les champs d'un utilisateur donné par son email
 * @param {Object} req
 * @param {Object} res
 */
exports.updateGivenUser = async (req,res)=>{
    const email = req.params.email;
    let userBuffer ={
        userName:req.body.userName,
        password:req.body.password
    };
    try{
        if (!req.body.userName || !req.body.password){
            return res.status(400).json({message:'missing_required_fields'})
        }
        const modifiedUser = await User.findOneAndUpdate(
            {email:email},
            userBuffer,
            {new:true, runValidators:true}
        );
        if (!modifiedUser){
            return res.status(404).json({message:'user_not_found'})
        }
        return res.status(200).json(modifiedUser);
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: 'internal_server_error' });
    }
};

/**
 * Supprimer un utilisateur donné par son email
 * @param {Object} req
 * @param {Object} res
 */
exports.deleteGivenUser = async (req,res)=>{
    const email=req.params.email;
    try{
        const deleteUser = await User.findOneAndDelete({email:email});
        if (!deleteUser){
            return res.status(404).json({message:'user_not_found'})
        }
        return res.status(200).json({message:'user_deleted'});
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: 'internal_server_error' });
    }
};

/**
 * Authentification du nom d'utilisateur et mot de passe
 * @param {Object} req
 * @param {Object} res
 */
exports.login = async (req,res) => {
    
try {
    const {email,password} = req.body;

    if (!email || !password){
        return res.status(400).json({message:'Missing_required_field'});
    }

    const user = await User.findOne({email:email});
    if(!user){
        return res.status(404).json({message:'user_not_found'});
    }

    //Vérifier le mot de passe
    const isMatch = await bcrypt.compare (password, user.password);
    if (!isMatch){
        return res.status(401).json({message:'invalid-credentials'})
    }

    //Générer le token
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY || 'secretkey',
        { expiresIn: '1h' }
    );
    return res.status(200).json({
        message: 'login_succees',
        token:token,
        user: {
                userName: user.userName, 
                email: user.email 
            }
    });
   
}catch(error){
    console.error(error);
    return res.status(500).json({message:'internal_server_error'});
}
};

//Déconnexion de l'utilisateur
exports.logout = (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(400).json({ message: 'token_missing' });
    }

    const token = authHeader.split(' ')[1];

    // 🔴 Ajouter à la blacklist
    blacklist.add(token);

    return res.status(200).json({
        message: 'logout_success'
    });
};