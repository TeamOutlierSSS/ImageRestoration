const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    const text = req.query.text;
    res.send({test: text});
});

module.exports = router;