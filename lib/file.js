const file = {
  date : function(fileBirth, fileMtime){
    return `<p>작성일 : ${fileBirth.getFullYear()}년 ${fileBirth.getMonth()+1}월 ${fileBirth.getDate()}일 ${fileBirth.getHours()}시 ${fileBirth.getMinutes()}분</p>
    <p>최근 수정 : ${fileMtime.getFullYear()}년 ${fileMtime.getMonth()+1}월 ${fileMtime.getDate()}일 ${fileMtime.getHours()}시 ${fileMtime.getMinutes()}분</p>`
  }
}

module.exports = file;
