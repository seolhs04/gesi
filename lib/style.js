const style = {
  main: function(){
    return `
    <style>
    body{
      margin:0;
      text-align: center;
      background-color:#f6f9fc;
    }
    button{
      cursor:pointer;
    }
    h1{
      font-size:45px;
    }
    h1>a{
      text-decoration:none;
      color:black;
    }
    body>div{
      margin: auto;
      margin-top: 50px;
      width: 800px;
    }
    body>div>a{
      margin-left:auto;
      display:block;
      font-size:16px;
      text-decoration:none;
      background-color: #efefef;
      color:black;
      padding-top:1px;
      border : 1px solid black;
      border-radius:2px;
      width:64px;
      height:24px;
      text-align:center;
    }
    body>div>a:hover{
      background-color: #d7d7d7;
    }
    table{
      background-color:white;
      margin: 10px auto;
      margin-bottom: 30px;
      width:800px;
      border-collapse: collapse;
      text-align: left;
      box-shadow: 0 4px 6px rgba(50,50,93,0.11), 0 1px 3px rgba(0, 0, 0, 0.5);
    }
    table tr{
      box-shadow: 0 4px 6px rgba(50,50,93,0.11), 0 1px 3px rgba(0, 0, 0, 0.5);
    }
    table th{
      padding: 0px;
      height: 28px;
      background-color:#c9def3;
    }
    table td p{
      margin: 2px;
    }
    </style>
    `
  },
  article: function(){
    return `
    <style>
    body{
      margin:0;
      background-color:#f6f9fc;
    }
    h1{
      text-align: center;
      font-size:45px;
    }
    h1>a{
      text-decoration:none;
      color:black;
    }
    .bu_box{  /*update, dele div bu_box*/
      display: flex;
      width: 800px;
      margin: auto;
      margin-top: 50px;
      align-self: flex-end;
    }
    .bu_box form{
      margin-left: auto;
      margin-right:5px;
    }
    .bu_box input{
      font-size:16px;
      cursor:pointer;
      padding:0;
      width:66px;
      height:27px;
      border: 1px solid black;
      border-radius:2px;
    }
    .bu_box input:hover{
      background-color: #d7d7d7;
    }
    .bu_box a{
      font-size:16px;
      text-decoration:none;
      background-color: #efefef;
      color:black;
      padding-top:1px;
      border : 1px solid black;
      border-radius:2px;
      width:64px;
      height:24px;
      text-align:center;
    }
    .bu_box a:hover{
      background-color: #d7d7d7;
    }
    .article{ /*article div*/
      background-color:white;
      width: 800px;
      margin:auto;
      margin-top:10px;
      height:500px;
      box-shadow: 0 4px 6px rgba(50,50,93,0.11), 0 1px 3px rgba(0, 0, 0, 0.5);
    }
    .article h2{
      font-size: 30px;
      margin: 0;
    }
    .article h2+p, h2+p+p{
      text-align: right;
      font-size: 10px;
      margin:0;
    }
    .article h2+p+p+p{
      font-size: 20px;
    }
    </style>
    `
  },
  cre_up: function(){
    return `
    <style>
    body{
      margin:0;
      text-align: center;
      background-color:#f6f9fc;
    }
    h1{
      font-size:45px;
    }
    h1>a{
      text-decoration:none;
      color:black;
    }
    .title{
      margin-top:50px;
      width:600px;
      height:40px;
      border-top:1px solid grey;
      border-left:1px solid grey;
      box-shadow: 0 4px 6px rgba(50,50,93,0.11), 0 1px 3px rgba(0, 0, 0, 0.5);
    }
    textarea{
      width:600px;
      height: 400px;
      border-top:1px solid grey;
      border-left:1px solid grey;
      box-shadow: 0 4px 6px rgba(50,50,93,0.11), 0 1px 3px rgba(0, 0, 0, 0.5);
    }
    </style>
    `
  }
}

module.exports = style;
