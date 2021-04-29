const express = require('express');
const url = require('url');
const fs = require('fs');
const template = require('../lib/template.js');

const router = express.Router();

router.get('/', function(req,res){
  const queryData = url.parse(req.url, true).query;
  if (queryData.page === undefined) {
        res.redirect('/?page=1');
  } else if(queryData.page !== undefined){
    fs.readdir('./data', function(err, filelist) {
        var listData = template.list(filelist, queryData.page);
        var _style = '<link rel="stylesheet" href="/styles/main.css">'
        var html = template.html('게시판', listData, `<div><a href='/create'>글 쓰기</a></div>`, _style);
        res.send(html);
    });
  };
});

module.exports = router;
