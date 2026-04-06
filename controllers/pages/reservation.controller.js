const Reservation = require('../../models/reservation.model');

/**
 * Affiche la liste des réservations
 * @param {Object} req
 * @param {Object} res
 */
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();

        res.render('pages/reservations', {
            user: req.session.user,
            reservations,
            errorMessage: null 
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
};

/**
 * Gère les actions CRUD pour les reservationss
 * @param {Object} req
 * @param {Object} res
 */
exports.handleReservation = async (req, res) => {
    const { action, reservationId, catwayNumber, clientName, boatName, startDate, endDate } = req.body;

    try {

        if (action === 'create') {
            await Reservation.create({ catwayNumber, clientName, boatName, startDate, endDate });
        }

        if (action === 'update') {
            await Reservation.updateOne(
                { _id: reservationId },
                { catwayNumber, clientName, boatName, startDate, endDate }
            );
        }

        if (action === 'delete') {
            await Reservation.deleteOne({ _id: reservationId });
        }
        res.redirect('/reservations');

    } catch (error) {
        console.error(error);
        res.render('pages/reservations', {
            user: req.session.user,
            reservations: await Reservation.find(),
            errorMessage: 'Erreur lors de l’opération'
        });
    }
};