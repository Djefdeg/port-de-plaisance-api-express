// récupérer les données
const user_Name = sessionStorage.getItem('UserName');
const user_Email = sessionStorage.getItem('UserEmail');

// injecter dans la page
document.getElementById('name').textContent = user_Name;
document.getElementById('email').textContent = user_Email;

// afficher la date du jour
const today = new Date();
document.getElementById('date').textContent = today.toLocaleDateString();

//Fonction qui charge toutes les réservations de la base de données
async function loadReservations() {
    try {
        const token = sessionStorage.getItem('token');

        const response = await fetch('/catways/reservations/all', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const data = await response.json();


        if (!response.ok) {
            console.error(data.message);
            return;
        }

        displayReservations(data);

    } catch (err) {
        console.error(err);
    }
}

//Affichage des réservation dans le tableau
function displayReservations(reservations) {
     const today = new Date();

    //Le filtre est réalisé ici car celui du controller ne fonctionne pas
    const currentReservations = reservations.filter(res => {
        return new Date(res.startDate) <= today &&
               new Date(res.endDate) >= today;
    });

    const tableBody = document.getElementById('reservations-body');
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

// 🔥 appel de la fonction chargement des reservations
   loadReservations();