
/**
 * Vérifier si le user est stocké dans la session serveur
 * @param {Object} req
 * @param {Object} res
 */
module.exports = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/'); // pas connecté → retour login
    }
    next();
};