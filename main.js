const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const template = require('./lib/template.js');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const file = require('./lib/file.js');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const indexRouter = require('./routes/index.js');
const topicRouter = require('./routes/topic.js');
const createRouter = require('./routes/create.js');
const updateRouter = require('./routes/update.js');
const deleteRouter = require('./routes/delete.js');

const app = express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(compression());
app.use(express.static('public'));

app.use(function(req,res,next){
  fs.exists('./data', function(exists){
    if(exists == false){
      console.log('data파일을 만듭니다')
      fs.mkdirSync('./data');
    }
  });
  next();
})

app.use('/', indexRouter);

app.use('/topic', topicRouter);

app.use('/create', createRouter);

app.use('/update', updateRouter);

app.use('/delete_process', deleteRouter);

app.use(function(err,req,res,next){
  res.status(500).send('Something is Wrong');
})

app.use(function(req,res,next){
  res.status(404).send('404 Not Found')
});

app.listen(2400, function(){
  console.log('app start!!');
});
