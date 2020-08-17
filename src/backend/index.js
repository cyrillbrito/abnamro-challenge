const express = require('express');
const dataLayer = require('./data-layer');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/nodes', (req, res) => {
  res.send(dataLayer.loadNodes());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
