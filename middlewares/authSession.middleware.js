module.exports = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/'); // pas connecté → retour login
    }
    next();
};