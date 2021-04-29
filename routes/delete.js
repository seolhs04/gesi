const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.post('/', function(req,res){
    var post = req.body;
    var title = post.title;
    const filteredId = path.parse(title).base;
    fs.unlink(`./data/${filteredId}`, function(err) {
      res.redirect(`/`);
    });
});

module.exports = router;
