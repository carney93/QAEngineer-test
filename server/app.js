const express = require('express');
const app = express();

app.use(express.json());

// Define your routes here

module.exports = app;  // Export the app so it can be imported in server.js and tests
