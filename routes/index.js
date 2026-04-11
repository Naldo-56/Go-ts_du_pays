const express = require('express');
const path = require('path');

const router = express.Router();
const pagesDir = path.join(__dirname, '..', 'public', 'pages');

router.get('/', (req, res) => {
  res.sendFile(path.join(pagesDir, 'index.html'));
});

router.get('/menu', (req, res) => {
  res.sendFile(path.join(pagesDir, 'menu.html'));
});

module.exports = router;
