const fs = require('fs');

function getTime(path) {
  var t = new Date();
  var MS = t.getTime();
  var filebirthMS = fs.statSync(path).birthtime.getTime();
  return Math.floor((MS - filebirthMS) / 1000);
}

function timeFactory(path) {
  var time = getTime(path);
  if (time < 60) { //1초부터60초
    return `${time}초`;
  } else if (60 <= time && time < 3600) { //1분부터60분
    return `${Math.floor(time/60)}분`;
  } else if (3600 <= time && time < 86400) { //1시간부터24시간
    return `${Math.floor(time/3600)}시간`;
  } else if (86400 <= time && time < 604800) { //1일부터7일
    return `${Math.floor(time/86400)}일`;
  } else if (604800 <= time && time < 2419200) { //1주부터 4주
    return `${Math.floor(time/604800)}주`;
  } else { //나머지 달
    return `${Math.floor(time/2419200)}달`;
  }
}
function sortArrByBirth(filelist){
  var arr = new Array(filelist.length);
  for(var j=0; j < filelist.length; j++){ //파일이름과 파일생성날짜를 지닌 객체 생성
    arr[j] = {"fileName":filelist[j], "birthtime":fs.statSync(`./data/${filelist[j]}`).birthtime.getTime()}
  }
  arr.sort(function(a, b){  //파일생성날짜로 내림차순정렬
    return b.birthtime - a.birthtime;
  })
  var sortedArr = new Array(arr.length);
  for(var i=0; i < arr.length; i++){  //정렬한 객체의 파일이름만 뽑아 배열 선언
    sortedArr[i] = arr[i].fileName;
  }
  return sortedArr; //리턴
}
const template = {
  html: function(title, data, crud, style) {
    var html = `<!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    ${style}
    <title>${title}</title>
    </head>
    <body>
    <h1><a href='/?page=1'>게시판</a></h1>
    ${crud}
    ${data}
    </body>
    </html>`
    return html
  },
  list: function(filelist, x) {
    filelist = sortArrByBirth(filelist);
    var listData = '<table><th>번호</th><th>제목</th><th>글쓴이</th></th><th>시간</th>';
    if (x * 15 < filelist.length) {
      for (var i = (x * 15) - 15; i < x * 15; i++) {
        var time = timeFactory(`./data/${filelist[i]}`);
        listData += `<tr><td>${i+1}</td><td><a href="./?id=${filelist[i]}">${filelist[i]}</a></td><td>익명</td><td><p>${time} 전</p></td></tr>`
      };
    } else {
      for (var i = (x * 15) - 15; i < filelist.length; i++) {
        var time = timeFactory(`./data/${filelist[i]}`);
        listData += `<tr><td>${i+1}</td><td><a href="./?id=${filelist[i]}">${filelist[i]}</a></td><td>익명</td><td><p>${time} 전</p></td></tr>`
      };
    }
    listData += '</table>';
    for (var i = 1; i < (filelist.length / 15) + 1; i++) {
      listData += `<button onclick="location.href='/?page=${i}'">${i}</button>`
    }
    return listData;
  }
}

module.exports = template;
