const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
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
    components: {
      securitySchemes: {
        bearerAuth: {        // <-- définition du security scheme
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],     // <-- sécurité appliquée globalement à toutes les routes
      },
    ],
  },
  apis: ['./routes/*.js'],  // fichiers avec commentaires JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;