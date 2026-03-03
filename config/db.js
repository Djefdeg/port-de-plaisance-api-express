const mongoose = require('mongoose');

// URL de connexion (locale ou MongoDB Atlas)
const dbURI = 'mongodb+srv://djefdeg:Russel1234@russel.u05t9if.mongodb.net/?appName=russel';

// Fonction de connexion asynchrone
async function connectDB() {
  try {
    // Tentative de connexion
    await mongoose.connect(dbURI);
    console.log('✅ Connexion à MongoDB réussie !');
  } catch (error) {
    console.error('❌ Erreur de connexion à MongoDB :', error.message);
  }
}

module.exports = connectDB;
