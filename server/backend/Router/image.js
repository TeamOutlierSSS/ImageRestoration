const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer');

app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: './public/img/',
  filename: function (req, file, callback) {
    callback(null, 'imgfile' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
});

app.post('/upload', upload.single('image'), function (req, res, next) {
    console.log(fileName);
  res.send({
    fileName: req.file.filename,
  });
});

module.exports = router;
