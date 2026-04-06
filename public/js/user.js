// Récupérer les éléments du DOM
const tableBody = document.querySelector('.user_table tbody');

function displayUsers(users) {
    tableBody.innerHTML = '';
    users.forEach(use => {
        const row = `
            <tr>
                <td>${use._id}</td>
                <td>${use.userName}</td>
                <td>${use.email}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Charger le tableau au démarrage

displayUsers(usersData);