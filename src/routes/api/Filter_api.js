const express = require('express');
const { getDataFiltered } = require('../../controller/apiController');


let router = express.Router();

const API_Filtering = (app) => {
    router.get('/filtering', getDataFiltered)
    app.use('/api/', router);
}

module.exports = API_Filtering;