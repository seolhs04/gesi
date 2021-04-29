const express = require('express');
const path = require('path');
const fs = require('fs');
const sanitizeHtml = require('sanitize-html');
const file = require('../lib/file.js');
const template = require('../lib/template.js');

const router = express.Router();

router.get('/:dataId', function(req,res,next){
  const filteredId = path.parse(req.params.dataId).base;
  fs.readFile(`./data/${req.params.dataId}`, 'utf8', function(err, data) {
    if(err){
      next();
    } else{
      fs.stat(`./data/${req.params.dataId}`, function(err, stat){
        var fileBirth = stat.birthtime;
        var fileMtime = stat.mtime;
        var _style = '<link rel="stylesheet" href="/styles/topic.css">';
        var sanitizedTitle = sanitizeHtml(filteredId);
        var sanitizedData = sanitizeHtml(data);
        var fileDate = file.date(fileBirth, fileMtime);
        var html = template.html(sanitizedTitle,
          `<a href='/update?id=${sanitizedTitle}'>글 수정</a></div>
          <div class="article"><h2>${sanitizedTitle}</h2>
          ${fileDate}
          <p>${sanitizedData}</p></div>`,
          `<div class="bu_box"><form action='/delete_process' method='post' onsubmit='return delCheck()'>
          <input type='hidden' name='title' value='${sanitizedTitle}'>
          <input type='submit' value='글 삭제'>
          </form>
          <script src='/js/delCheck.js'></script>
          `, _style)
          res.send(html);
        });
    }
  });
});

module.exports = router;
