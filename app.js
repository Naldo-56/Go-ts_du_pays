const express = require('express');
const path = require('path');
const config = require('./config');
const routes = require('./routes');

const app = express();

// Fichiers statiques (CSS, JS, images) servis depuis /public
app.use(express.static(path.join(__dirname, 'public')));

// Routes de l'application
app.use('/', routes);

app.listen(config.port, () => {
  console.log(`${config.appName} running at http://localhost:${config.port}`);
});
