const jwt = require('jsonwebtoken');
const blacklist = require('./tokenBlacklist');

module.exports = (req, res, next) => {
    try {
        // Récupérer le token dans le header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: 'token_missing' });
        }

        // Format attendu : "Bearer TOKEN"
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'token_invalid' });
        }

        // 🔴 Vérifier blacklist
        if (blacklist.has(token)) {
            return res.status(401).json({ message: 'token_revoked' });
        }

        // Vérifier le token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY || 'secretkey'
        );

        // Ajouter les infos utilisateur à la requête
        req.user = decoded;

        next();
       
    } catch (error) {
        return res.status(401).json({ message: 'unauthorized' });
    }
};