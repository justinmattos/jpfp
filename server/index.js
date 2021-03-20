const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/public', express.static('./public'));
app.use('/dist', express.static('./dist'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const innit = () => {
  app.listen(PORT, () => console.log(`App is now running on PORT: ${PORT}`));
};

innit();
