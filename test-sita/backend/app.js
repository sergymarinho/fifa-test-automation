const express = require('express')
const cors = require('cors')

// Express
const app = express()

// Plugins
app.use(cors());

// Routes
app.use('/api', require('./routes'));

module.exports = app;