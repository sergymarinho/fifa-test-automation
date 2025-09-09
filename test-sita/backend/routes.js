const routes = require('express').Router();
const playerController = require('./controllers/players')
const infoController = require('./controllers/info')
const teamController = require('./controllers/teams')

// Players
routes.get('/players', playerController.list)
routes.get('/players/search', playerController.search)
routes.get('/players/top/:topk/overall', playerController.topOverall)
routes.get('/players/:id/img', playerController.getProfileImage)

// Team
routes.get('/team/best', teamController.best)

// Information
routes.get('/all/nationalities', infoController.nationalities)
routes.get('/all/positions', infoController.positions)
routes.get('/all/leagues', infoController.leagues)


module.exports = routes;