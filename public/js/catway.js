// Récupérer les éléments du DOM
const tableBody = document.querySelector('.catway_table tbody');

function displayCatways(catways) {
    tableBody.innerHTML = '';
    catways.forEach(cat => {
        const row = `
            <tr>
                <td>${cat.catwayNumber}</td>
                <td>${cat.catwayType}</td>
                <td>${cat.catwayState}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Charger le tableau au démarrage

displayCatways(catwaysData);