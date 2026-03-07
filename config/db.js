const mongoose = require('mongoose');

// Fonction de connexion asynchrone
async function connectDB() {
  try {
    // Tentative de connexion
    await mongoose.connect(process.env.dbURI);
    console.log('✅ Connexion à MongoDB réussie !');
  } catch (error) {
    console.error('❌ Erreur de connexion à MongoDB :', error.message);
  }
}

module.exports = connectDB;
