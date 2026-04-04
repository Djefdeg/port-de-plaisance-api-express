document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  //const userName = document.getElementById('name').value;

  try{
    const response = await fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      document.getElementById('message').textContent = data.message;
      return;
    }
    // Sauvegarde du token
    sessionStorage.setItem('token', data.token);
    // Sauvegarde du nom d'utilisateur
    sessionStorage.setItem('UserName', data.user.userName);
    // Sauvegarde de l'email
    sessionStorage.setItem('UserEmail', data.user.email);
    
    // document.getElementById('message').textContent = 'Login successful';

    //Redirection vers la route du tableau de bord
    window.location.href = '/dashboard';
  }catch (err) {
    document.getElementById('message').textContent = 'Error: ' + err.message;
  }  
});