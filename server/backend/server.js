const express = require('express');
const app = express();
const imagejs = require('./Router/image');
const PORT = 3001;

app.use(express.static('public'));
// app.use(express.static(__dirname + 'public'));

app.use('/api/upload', imagejs);

app.listen(PORT, function () {
  console.log('listening on ' + PORT);
});
