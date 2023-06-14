const express = require('express');
const path = require('path');
const app = express();
const imagejs = require('./Router/image');
const PORT = 3001;

app.use(express.static('public'));

app.use('/api/upload', imagejs);

app.get(`/api/download/:filePath`, function (req, res, next) {
  const downloadPath = path.join(__dirname, '/public/img', req.params.filePath);
  res.download(downloadPath, `restored_${req.params.filePath}`);
});

app.listen(PORT, function () {
  console.log('listening on ' + PORT);
});
