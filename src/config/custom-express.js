const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use('/static', express.static('src/app/public'));

app.use(bodyParser.json());


const rotas = require('../app/rotas/rotas');
rotas(app);

module.exports = app;