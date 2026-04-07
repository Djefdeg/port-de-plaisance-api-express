const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',  // <-- version obligatoire et valide
    info: {
      title: 'API Port de plaisance',
      version: '1.0.0',
      description: 'Documentation API pour la gestion de catways',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],  // <-- tes fichiers avec commentaires JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;