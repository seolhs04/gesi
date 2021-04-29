const express = require('express');
const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const template = require('../lib/template.js');

const router = express.Router();

router.get('/', function(req,res,next){
  const queryData = url.parse(req.url, true).query;
  fs.readFile(`./data/${queryData.id}`, 'utf8', function(err, description) {
    if(err){
      next(err);
    } else{
      var _style = '<link rel="stylesheet" href="/styles/creAndUp.css">';
      const filteredId = path.parse(queryData.id).base;
      var html = template.html('게시판', `
      <form action='/update/update_process' method='post'>
      <p>
      <input type='hidden' name='title' value=${filteredId}>
      <input type='text' class="title" name='new_title' placeholder="제목" value=${filteredId}>
      </p>
      <p>
      <textarea name='description' placeholder="본문">${description}</textarea>
      </p>
      <input type='submit'>
      </form>
      `, '', _style);
      res.send(html);
    }
  });
})

router.post('/update_process', function(req,res){
    var post = req.body;
    var title = post.title;
    var new_title = post.new_title;
    var description = post.description;
    fs.rename(`./data/${title}`, `./data/${new_title}`, function(err) {
      fs.writeFile(`./data/${new_title}`, description, 'utf8', function(err) {
        res.redirect(`/topic/${qs.escape(new_title)}`);
        res.send('success');
      });
    });
})

module.exports = router;
