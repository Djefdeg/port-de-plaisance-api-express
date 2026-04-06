const User = require('../../models/user.model');
const bcrypt = require ('bcrypt');

/**
 * Affiche la page d'accueil 
 * @param {Object} req
 * @param {Object} res
 */
exports.home = (req, res) => {
    res.render('pages/home');
};

/**
 * Traiter le login (POST /login)
 * @param {Object} req
 * @param {Object} res
 */
exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.render('pages/home', { error: 'Utilisateur introuvable' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.render('pages/home', { error: 'Mot de passe incorrect' });
    }

    // session
    req.session.user = {
        userName: user.userName,
        email: user.email
    };

    // redirection
    res.redirect('/dashboard');
};

/**
 * Deconnexion en supprimant la session
 * @param {Object} req
 * @param {Object} res
 */

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Erreur lors de la déconnexion:', err);
            return res.status(500).send('Erreur serveur');
        }
        res.clearCookie('connect.sid'); // Nettoie le cookie de session
        res.redirect('/'); // Redirection vers la page d'accueil
    });
};