const swaggerAutogen = require('swagger-autogen')();

const doc ={
    info:{
        title:'Acadamy Project',
        description:'API Documentation'
    },
    host: 'localhost:3025',
    schemes: ['http']
};

// const outputFile = './swagger-output.json';
const outputFile = './public/swagger_output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server');
})