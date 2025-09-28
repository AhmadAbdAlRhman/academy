const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
require('./module/linking');
require('dotenv').config();
const swaggerDocument = require('./swagger-output.json');
app.use('/api_docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(3025, () => {
    console.log(`🚀 Server listening on http://localhost:3025`);
})