const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './public/img',
  filename: function (req, file, callback) {
    callback(null, 'imgfile' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000000 },
});

router.post('/', upload.single('image'), async function (req, res, next) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  res.send({
    fileName: req.file.filename,
  });
});

module.exports = router;
