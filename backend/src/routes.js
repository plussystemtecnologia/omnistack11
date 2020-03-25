const express = require('express');
const routes = express.Router();
const ongsController = require('./controllers/ongs');
const incidentsController = require('./controllers/incidents');
const profileController = require('./controllers/profile');
const sessionController = require('./controllers/session');

// Ongs
routes.get('/ongs', ongsController.index);
routes.post('/ongs', ongsController.create);

// Session
routes.post('/session', sessionController.create);

// Incidents
routes.get('/incidents', incidentsController.index);
routes.post('/incidents', incidentsController.create);
routes.delete('/incidents/:id', incidentsController.delete);

// Profile
routes.get('/profile', profileController.index);

module.exports = routes;
