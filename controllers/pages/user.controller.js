const User = require('../../models/user.model');
const bcrypt = require('bcrypt');


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.render('pages/users', {
            user: req.session.user,
            users,
            errorMessage: null 
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
};

exports.handleUser = async (req, res) => {
    const { action, userId, userName, email, password } = req.body;

    try {

        if (action === 'create') {
            await User.create({ userName, email, password });
        }

        if (action === 'update') {
            let updatedFields = { userName, email, password };
            // Si le mot de passe est fourni, on le hash avant update
            if (password && password.trim() !== '') {
                updatedFields.password = await bcrypt.hash(password, 10);
            }
            await User.updateOne(
                { _id: userId },
                 updatedFields
            );  
            const updated = await User.findById(userId);
            console.log("Mot de passe mis à jour :", updated.password);
        }

        if (action === 'delete') {
            await User.deleteOne({ email: email });
        }
        res.redirect('/users');

    } catch (error) {
        console.error(error);
        res.render('pages/users', {
            user: req.session.user,
            users: await User.find(),
            errorMessage: 'Erreur lors de l’opération'
        });
    }
};