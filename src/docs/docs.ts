import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation for your application',
    },
  },
  apis: ['./src/route/index.ts'],
};

const specs = swaggerJsdoc(options);

export default specs;

