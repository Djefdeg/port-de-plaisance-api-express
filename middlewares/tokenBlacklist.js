
/**
 * Permet une déconnection réelle et oblige l'utilisateur a se reconnecter pour faire des requetes apres déconnexion
 * @param {Object} req
 * @param {Object} res
 */
const blacklist = new Set();

module.exports = blacklist;