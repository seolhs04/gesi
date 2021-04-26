const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const template = require('./lib/template.js');
const path = require('path');
const style = require('./lib/style.js');
const sanitizeHtml = require('sanitize-html');
const express = require('express');

const app = express();

function file_Date(fileBirth, fileMtime){
  return `<p>작성일 : ${fileBirth.getFullYear()}년 ${fileBirth.getMonth()+1}월 ${fileBirth.getDate()}일 ${fileBirth.getHours()}시 ${fileBirth.getMinutes()}분</p>
  <p>최근 수정 : ${fileMtime.getFullYear()}년 ${fileMtime.getMonth()+1}월 ${fileMtime.getDate()}일 ${fileMtime.getHours()}시 ${fileMtime.getMinutes()}분</p>`
}

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
      var fileDate = file_Date(fileBirth, fileMtime);
      var html = template.html(sanitizedTitle,
        `<a href='/update?id=${sanitizedTitle}'>글 수정</a></div>
        <div class="article"><h2>${sanitizedTitle}</h2>
        ${fileDate}
        <p>${sanitizedData}</p></div>`,
        `<div class="bu_box"><form action='/delete_process' method='post'>
        <input type='hidden' name='title' value='${sanitizedTitle}'>
        <input type='submit' value='글 삭제'>
        </form>`, _style)
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
  var body = '';
  req.on('data', function(data) {
    body += data;
  });
  req.on('end', function() {
    var post = qs.parse(body);
    var title = post.title;
    var description = post.description;
    fs.writeFile(`./data/${title}`, description, 'utf8', function(err) {
      res.redirect(`/topic/${qs.escape(title)}`);
      res.send('success');
    });
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
  var body = '';
  req.on('data', function(data) {
    body += data;
  });
  req.on('end', function() {
    var post = qs.parse(body);
    var title = post.title;
    var new_title = post.new_title;
    var description = post.description;
    fs.rename(`./data/${title}`, `./data/${new_title}`, function(err) {
      fs.writeFile(`./data/${new_title}`, description, 'utf8', function(err) {
        res.redirect(`/topic/${qs.escape(new_title)}`);
        res.send('success');
      });
    });
  });
})

app.post('/delete_process', function(req,res){
  var body = '';
  req.on('data', function(data) {
    body += data;
  });
  req.on('end', function() {
    var post = qs.parse(body);
    var title = post.title;
    const filteredId = path.parse(title).base;
    fs.unlink(`./data/${filteredId}`, function(err) {
      res.redirect(`/`);
    });
  });
})

app.listen(2400);
/*const server = http.createServer(function(req, res) {

  if (pathname === '/') {
    if (queryData.id === undefined && queryData.page === undefined) {

    } else if(queryData.page !== undefined){

    } else {

  } else if (pathname === '/create') {

  } else if (pathname === '/create_process') {

  } else if (pathname === '/delete_process') {

  } else if (pathname === '/update') {

  } else if (pathname === '/update_process') {

  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(2400);*/
