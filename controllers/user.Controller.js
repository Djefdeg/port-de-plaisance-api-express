
const User = require ('../models/user.model');

//Afficher la liste des utilisateurs
exports.getAllUsers = async (req,res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    }catch (error){
         console.error(error);
         return res.status(500).json({ message: 'internal_server_error' });
    }
};

//Afficher un user déterminé par son email.
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

//Créer un nouvel utilisateur
exports.createUser = async(req,res) => {
    console.log(req.body);
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

//Modifier les champs d'un utilisateur donné par son email
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

//Supprimer un utilisateur donné par son email
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