const faker = require('faker/locale/en_US');
const express = require('express');
const path = require('path');
const { syncAndSeed } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/public', express.static('./public'));
app.use('/dist', express.static('./dist'));
app.use('/api', require('./api'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => console.log(`App is now running on PORT: ${PORT}`));
