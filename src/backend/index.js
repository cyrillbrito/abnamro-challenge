const express = require('express');
const cors = require('cors');
const dataLayer = require('./data-layer');

const app = express();
app.use(cors());

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/nodes', async (req, res) => {
  res.send(await dataLayer.loadNodes());
});

app.get('/random', (req, res) => {
  res.send(dataLayer.loadRandom());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
