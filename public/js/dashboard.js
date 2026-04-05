
 //Filtrage de reservation pour ne garder que celles en cours
   function getCurrentReservations(reservations) {
        const today = new Date();
        return reservations.filter(res => {
            const start = new Date(res.startDate);
            const end = new Date(res.endDate);
                return start <= today && end >= today;
        });
    }

//Affichage des réservation dans le tableau
function displayReservations(reservations) {
    
    const currentReservations = getCurrentReservations(reservations);

    const tableBody = document.getElementById('reservationTable');
    tableBody.innerHTML = '';

    currentReservations.forEach(res => {
        const row = `
            <tr>
                <td>${res.clientName}</td>
                <td>${res.catwayNumber}</td>
                <td>${new Date(res.startDate).toLocaleDateString()}</td>
                <td>${new Date(res.endDate).toLocaleDateString()}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// 🔥 appel de la fonction d'affichage
   displayReservations(reservationsData);