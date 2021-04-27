const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const template = require('./lib/template.js');
const path = require('path');
const style = require('./lib/style.js');
const sanitizeHtml = require('sanitize-html');
const file = require('./lib/file.js');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const app = express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(compression());
app.use(express.static('public'));
fs.exists('./data', function(exists){
  if(exists == false){
    console.log('data파일을 만듭니다')
    fs.mkdirSync('./data');
  }
});

app.get('/', function(req,res){
  const queryData = url.parse(req.url, true).query;
  if (queryData.page === undefined) {
        res.redirect('/?page=1');
  } else if(queryData.page !== undefined){
    fs.readdir('./data', function(err, filelist) {
        var listData = template.list(filelist, queryData.page);
        var _style = style.main();
        var html = template.html('게시판', listData, `<div><a href='/create'>글 쓰기</a></div>`, _style);
        res.send(html);
    });
  };
});

app.get('/topic/:dataId', function(req,res){
  fs.readFile(`./data/${req.params.dataId}`, 'utf8', function(err, data) {
    const filteredId = path.parse(req.params.dataId).base;
    fs.stat(`./data/${req.params.dataId}`, function(err, stat){
      var fileBirth = stat.birthtime;
      var fileMtime = stat.mtime;
      var _style = style.article();
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
        <script>
        function delCheck(){
          var con = confirm('게시물을 삭제하시겠습니까?')
          if(con == true){
            return true;
          } else{
            return false;
          }
        }
        </script>
        `, _style)
        res.send(html);
    });
  });
});

app.get('/create', function(req,res){
  var _style = style.cre_up();
  var html = template.html('게시판', `
      <form action='/create_process' method='post'>
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

app.post('/create_process', function(req,res){
    var post = req.body;
    var title = post.title;
    var description = post.description;
    fs.writeFile(`./data/${title}`, description, 'utf8', function(err) {
      res.redirect(`/topic/${qs.escape(title)}`);
      res.send('success');
    });
});

app.get('/update', function(req,res){
  const queryData = url.parse(req.url, true).query;
  fs.readFile(`./data/${queryData.id}`, 'utf8', function(err, description) {
    var _style = style.cre_up();
    const filteredId = path.parse(queryData.id).base;
    var html = template.html('게시판', `
    <form action='/update_process' method='post'>
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
  });
})

app.post('/update_process', function(req,res){
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

app.post('/delete_process', function(req,res){
    var post = req.body;
    var title = post.title;
    const filteredId = path.parse(title).base;
    fs.unlink(`./data/${filteredId}`, function(err) {
      res.redirect(`/`);
    });
})

app.listen(2400);
