//GET '127.0.0.1:3000/users/1' -v    0w0
const mongo=require('mongoose')
const express = require('express');
const app = express();
const bodyParser=require('body-parser'); //for post method body parsing
const ip='155.230.34.149';
const port=3000;

app.listen(port,ip, () => {
  console.log('ip : '+ip+' port number : '+port);
  console.log('DKE LAB SPA Server'); 
});

// connect to MongoDB / the name of DB is set to 'myDB_1'
mongo.connect('mongodb://localhost/SPA_Test2');
// we get the pending connection to myDB running on localhost
var db = mongo.connection;
var EdisonModel,TempModel;
// we get notified if error occurs
db.on('error', console.error.bind(console, 'connection error:'));
// executed when the connection opens
db.once('open', function callback () {
    // add your code here when opening
      console.log("mongodb open");
    (function createmongoSchema(){
    Schemas=require('./models');
    // console.dir(Schemas);
    EdisonSchema=Schemas.createEdisonSchema(mongo);
    TempSchema=Schemas.createTempSchema(mongo);
	// complie our schema in("EdisonData",EdisonSchema);
	//console.log('EdisonModel define');
	TempModel=mongo.model("TempData",TempSchema);
	//console.log('TempData define');
	}());

    //app.use('/parse_data',require('./api/user/parser')); excute parser func  
    //app.use('/load_edison',require('./api/user/load_edison')); // express 기능이용 load_edison코드 전체실행 async ->sync 콜백
	  //users 들어오는 요청에대해 /api/user 을 사용한다.,+ index.js 의 router 클래스를 미들웨어화 시킨것을 사용하는것
    //app.use ==> 두번째 인자를 사용한다.라는 의미 만약 인자가 두개일 경우 없을땐 첫번째 인자를
});

app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); //for parsing application/x-www-form-urlencoded
//app.use('/users',require('./api/user')); 

//web study

app.locals.pretty=true; //jade html code pretty
app.set('views','./views'); //views란 템플릿이 있는 디렉토리 jade 파일은 여기에 있을거임
app.set('view engine','jade'); //view engine 으로 jade 란 템플릿 사용 
app.get('/template',function(req,res){
  res.render('temp',{time:Date(),_title:'Jade'}); //temp file rendering -> send to web views에 있는 거 참조
  //2번쨰 인자에 객체전잘 하면 temp.jade 사용 가능 
}); 
app.get('/multi',function(req,res){//query string ex
  res.send(req.query.id+','+req.query.name); //home/topic?id=~~ or name etc...
  //155.230.34.149:3000/topic?name=pew&id=1
});

var topic=['SPA','DKE','Help ME'];
app.get('/topic',function(req,res){//query string ex
  var output=`
  <a href="/topic?id=0">SPAman</a><br>
  <a href="/topic?id=1">DKEMANS</a><br>
  <a href="/topic?id=2">Help..</a><br>
  ${topic[req.query.id]}
  `
  res.send(output);
  //res.send(topic[req.query.id]); //home/topic?id=~~ or name etc...
  //155.230.34.149:3000/topic?name=pew&id=1
});


app.get('/test/:id',function(req,res){ //semantic url 기존에 내가쓰던 /~/~
    var output=`
  <a href="/test/0">SPAman</a><br>
  <a href="/test/1">DKEMANS</a><br>
  <a href="/test/2">Help..</a><br>
  ${topic[req.params.id]}32
  `
  res.send(output); //rest api시는 결국 얘해야함 
});
app.get('/test/:id/:mode',function(req,res){
  res.send(req.params.id+' '+req.params.mode);
})

app.get('/form',function(req,res){
  res.render('form');
});
app.get('/form_receiver',function(req,res){
  var title=req.query.title;
  var desc=req.query.description;
  res.send(title+' '+desc);
})
app.post('/form_receiver',function(req,res){ //post method
  var title=req.body.title; //post 시 query가 아니라 body post는 url에 표현이 안된다 
  var desc=req.body.description;
  res.send('post '+title+' '+desc);
});

app.get('/',function(req,res){
  res.send('Hello World');
}); //home dir 들어올경우 function 

app.get('/login',function(req,res){
  res.send('<h1>login plz</h1>');
}); //login dir 들어올경우 function  //get -> router 요청에대해 중계해주는 역할 


app.use(express.static('public'));// public dir = 정적인것으로 사용할려고한다. 정적인 파일 서비스
//public dir 에 있는 static.html 쓰고싶으면 주소 = > home/static.html 정적인 코드 
app.get('/dynamic',function(req,res){//javascript+html을 통해 정적인 코드 
  var lis='';
  for(var i=0;i<5;i++){
    lis=lis+'<li>coding</li>';
  }
  //` 작은따옴표아님
  var time=Date();
  var output=`
  <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    DKE LAB SPA PROJECT! Dynamic ver
    <ul>
      ${lis}
    </ul>
      ${time}
  </body>
</html>`;
  res.send(output)
})

module.exports={
	connect:db,
  mongo:mongo
}