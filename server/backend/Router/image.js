const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const spawn = require('child_process').spawn;

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
  //await new Promise((resolve) => setTimeout(resolve, 500));
  try {
    var sizeOf = require('image-size');
    var dimensions = sizeOf('./public/img/'+ req.file.filename);
    let python;
    if (dimensions.height < 512 || dimensions.width < 512){
      python = spawn('python', ['basicsr/demo.py', '-opt', 'options/test/RestoreNet/RestoreNet-width64.yml', '--input_path',
      '../server/backend/public/img/' + req.file.filename, '--output_path', '../server/backend/public/img/inf_' + req.file.filename], {cwd: '../../RestoreNet'})
    }
    else{
      python = spawn('python', ['basicsr/demo.py', '-opt', 'options/test/RestoreNet/RestoreNet-width64-grid.yml', '--input_path',
      '../server/backend/public/img/' + req.file.filename, '--output_path', '../server/backend/public/img/inf_' + req.file.filename], {cwd: '../../RestoreNet'})
    }
    python.stdout.on('data', function (data) {
      console.log(data.toString())
      res.send({
        resultStatus: "success",
        fileName: 'inf_'+req.file.filename,
      });
    });
  } catch (err) {
    console.log(err)
  }

});

module.exports = router;
