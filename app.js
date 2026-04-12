const express = require('express');
const path = require('path');
const config = require('./config');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

app.listen(config.port, () => {
  console.log(`${config.appName} running at http://localhost:${config.port}`);
});
