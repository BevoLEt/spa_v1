//GET '127.0.0.1:3000/users/1' -v    0w0
const mongo=require('mongoose')
const express = require('express');
const app = express();
const bodyParser=require('body-parser');

const ip='155.230.34.149';
//const ip='127.0.0.1';
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
	// complie our schema into data
	EdisonModel=mongo.model("EdisonData",EdisonSchema);
	//console.log('EdisonModel define');
	TempModel=mongo.model("TempData",TempSchema);
	//console.log('TempData define');
	}());

    app.use('/parse_data',require('./api/user/parser'));
    //app.use('/load_edison',require('./api/user/load_edison')); // express 기능이용 load_edison코드 전체실행 async ->sync 콜백
	//users 들어오는 요청에대해 /api/user 을 사용한다.,+ index.js 의 router 클래스를 미들웨어화 시킨것을 사용하는것

});




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use('/users',require('./api/user')); 


module.exports={
	connect:db,
  mongo:mongo
}