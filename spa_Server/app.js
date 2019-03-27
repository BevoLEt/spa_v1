//GET '127.0.0.1:3000/users/1' -v    0w0
const mongo=require('mongoose')
const express = require('express');
const app = express();
const bodyParser=require('body-parser'); //for post method body parsing
const ip='127.0.0.1:3000';
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
var name=['LCAODFTLab','2D_Comp_P','2D_Incomp_P','KFLOW_EDISON_4','KFLOW_EDISON_5','SNUFOAM_ShipRes','dmd_pol','eklgcmc2','mc_nvt','PKsimEV','Single_Cell_Electrophysiology','acuteSTMtip','BAND_DOSLab','coulombdart','gravityslingshot','PhaseDiagramSW','pianostring','roundSTMtip','UTB_FET','WaveSimulation'];
// we get notified if error occurs
db.on('error', console.error.bind(console, 'connection error:'));
// executed when the connection opens
db.once('open', function callback () {
    // add your code here when opening
      console.log("mongodb open");
    (function createmongoSchema(){
    Schemas=require('./models');
    EdisonSchema=Schemas.createEdisonSchema(mongo);
    EdisonSetSchema=Schemas.createEdisonSetSchema(mongo);
    Refine_EdisonSetSchema=Schemas.createRefine_EdisonSetSchema(mongo);
    Input_EdisonSchema=Schemas.createInput_EdisonSchema(mongo);
    Latest1_EdisonSchema=Schemas.createLatest1Schema(mongo);
	 // complie our schema in("EdisonData",EdisonSchema)
    EdisonModel=mongo.model("EdisonData",EdisonSchema);
    EdisonSetModel=mongo.model("EdisonSetData",EdisonSetSchema);
    Refine_EdisonSetModel=mongo.model("Refine_EdisonSetData",Refine_EdisonSetSchema);
	  Input_EdisonModel=mongo.model("Input_EdisonData",Input_EdisonSchema);
    
    for(let i=0;i<name.length;i++){
      let latest1_EdisonModel=new Array();
      //eval("name["+i+"]=Latest1_"+name[i]+"EdisonModel");
      latest1_EdisonModel[i]=mongo.model('Latest1_'+name[i],Latest1_EdisonSchema);
    }
    
	}());
    
    app.use('/spa',require('./apps/api/api_bunch'));
    //app.use(require('./apps/data_control/parser')); //excute parser func  
    //app.use(require('./apps/data_control/load_edison')); // express 기능이용 load_edison코드 전체실행 async ->sync 콜백
    //app.use('~~'.require('~~~'));
	  //users 들어오는 요청에대해 /api/user 을 사용한다.,+ index.js 의 router 클래스를 미들웨어화 시킨것을 사용하는것
    //app.use ==> 두번째 인자를 사용한다.라는 의미 만약 인자가 두개일 경우 없을땐 첫번째 인자를
});

app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); //for parsing application/x-www-form-urlencoded or false..? 
//app.use(express.static('public'));// public dir = 정적인것으로 사용할려고한다. 정적인 파일 서비스
app.use('/',express.static('src'));

// //call view part and set view engine
app.locals.pretty=true; //jade html code pretty 줄바꿈도해줌
app.set('views','./views'); //views란 템플릿이 있는 디렉토리 jade 파일은 여기에 있을거임
app.set('view engine','jade'); //view engine 으로 jade 란 템플릿 사용 


module.exports={
	connect:db,
  mongo:mongo
}