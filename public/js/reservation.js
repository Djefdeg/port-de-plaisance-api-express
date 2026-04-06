// Récupérer les éléments du DOM
const tableBody = document.querySelector('.reservation_table tbody');

function displayReservations(reservations) {
    tableBody.innerHTML = '';
    reservations.forEach(reserv => {
        const row = `
            <tr>
                <td>${reserv._id}</td>
                <td>${reserv.catwayNumber}</td>
                <td>${reserv.clientName}</td>
                <td>${reserv.boatName}</td>
                <td>${new Date(reserv.startDate).toLocaleDateString('fr-FR')}</td>
                <td>${new Date(reserv.endDate).toLocaleDateString('fr-FR')}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Charger le tableau au démarrage

displayReservations(reservationsData);