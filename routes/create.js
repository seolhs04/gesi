const express = require('express');
const template = require('../lib/template.js');
const fs = require('fs');
const qs = require('querystring');

const router = express.Router();

router.get('/', function(req,res){
  var _style = '<link rel="stylesheet" href="/styles/creAndUp.css">';
  var html = template.html('게시판', `
      <form action='/create/create_process' method='post'>
      <p>
      <input type='text' class="title" name='title' placeholder="제목">
      </p>
      <p>
      <textarea name='description' placeholder="본문"></textarea>
      </p>
      <input type='submit'>
      </form>
      `, '', _style);
  res.send(html);
});

router.post('/create_process', function(req,res){
    var post = req.body;
    var title = post.title;
    var description = post.description;
    fs.writeFile(`./data/${title}`, description, 'utf8', function(err) {
      res.redirect(`/topic/${qs.escape(title)}`);
      res.send('success');
    });
});

module.exports = router;
