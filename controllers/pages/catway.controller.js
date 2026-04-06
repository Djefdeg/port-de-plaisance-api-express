const Catway = require('../../models/catway.model');

/**
 * Affiche la liste des catways
 * @param {Object} req
 * @param {Object} res
 */
exports.getAllCatways = async (req, res) => {
    try {
        const catways = await Catway.find();

        res.render('pages/catways', {
            user: req.session.user,
            catways,
            errorMessage: null // 👈 définir toujours la variable
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
};

/**
 * Gère les actions CRUD pour les catways
 * @param {Object} req
 * @param {Object} res
 */
exports.handleCatway = async (req, res) => {
    const { action, catwayNumber, catwayType, catwayState } = req.body;

    try {

        if (action === 'create') {

            const existing = await Catway.findOne({ catwayNumber });

            if (existing) {
                return res.render('pages/catways', {
                    user: req.session.user,
                    catways: await Catway.find(),
                    errorMessage: 'Catway déjà existant'
                });
            }

            await Catway.create({ catwayNumber, catwayType, catwayState });
        }

        if (action === 'update') {
            await Catway.updateOne(
                { catwayNumber },
                { catwayType, catwayState }
            );
        }

        if (action === 'delete') {
            await Catway.deleteOne({ catwayNumber });
        }

        res.redirect('/catways');

    } catch (error) {

        if (error.code === 11000) {
            return res.send('Numéro déjà utilisé');
        }

        console.error(error);
        res.status(500).send('Erreur serveur');
    }
};