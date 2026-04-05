const Reservation = require('../../models/reservation.model');

exports.dashboard = async (req, res) => {
    try {
        // On récupère toutes les réservations
        const reservations = await Reservation.find();

        // On envoie les données à la vue EJS
        res.render('pages/dashboard', {
            user: req.session.user,   // info utilisateur connecté
            reservations              // toutes les réservations
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
    }
};
