//GET '127.0.0.1:3000/users/1' -v    0w0

const express = require('express');
const router=express.Router();
const controller = require('./user.controller');
const mongo=require('mongoose'); // get mongoose package
const asmysql=require('mysql2/promise');

router.get('/users',controller.index);
router.get('/users/:id',controller.show);
router.delete('/users/:id',controller.destroy);
router.post('/users',controller.create);

//req client->server res server->client

// // connect to MongoDB / the name of DB is set to 'myDB_1'
// mongo.connect('mongodb://localhost/Exp_Test');
 
// // we get the pending connection to myDB running on localhost
// var db = mongo.connection;

// // we get notified if error occurs
// db.on('error', console.error.bind(console, 'connection error:'));
// // executed when the connection opens
// db.once('open', function callback () {
//     // add your code here when opening
//       console.log("mongodb open");
// });

// creates DB schema

// var userSchema = mongo.Schema({
// 	query: String,
//     name: String,
//     title_1: String,
//     title_2: String,
//     inputdataall: String
// });

// var mysqlSchema=mongo.Schema({
// 	cluster: String, 
// 	scienceAppName: String, 
// 	simulationUuid: String,
// 	jobExecTime: String, 
// 	jobStatus: String,
// 	jobData: String
// });

// //schema method
// userSchema.methods.speak=function(){
// 	var greeting=this.name
// 	?"Saved at Server and Name is"+this.name
// 	:"Something wrong"
// 	console.log(greeting);
// }
// // compiels our schema into a model
// var User = mongo.model('User', userSchema);
// var Mysql=mongo.model('Mysql',mysqlSchema);

/*----mysql part   ----*/ 
const mysql=require('mysql');
const port=3306;
const host='155.230.36.70';
const user='root';
const password='Yksuh@dblab1234';
const database='Chicken';
//db name, id, pw
//define 데이터베이스에 만들어질 테이블 이름 'user'

const connection=mysql.createConnection({
	host : host,
	port : port,
	user : user,
	password :password,
	database: database

});

connection.connect(function(err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
    console.log('mysql is connected');
   	//var ssmysql=test_load();
   	//var ssmysql=take_simdata();
   	connection.end(function(err){
	if(err)
	{
		console.error('mysql connection end phase error');
		console.error(rr);
		throw err;
	}
	console.error('mysql connection end');
	});
   	
});

//new Date().toISOString().slice(0, 19).replace('T', ' '); js date->to mysql
function take_simdata()
{
	var sql;
	var name=['LCAODFTLab','2D_Comp_P','2D_Incomp_P','KFLOW_EDISON_4','KFLOW_EDISON_5','SNUFOAM_ShipRes','dmd_pol','eklgcmc2','mc_nvt','PKsimEV','Single_Cell_Electrophysiology','acuteSTMtip','BAND_DOSLab','coulombdart','gravityslingshot','PhaseDiagramSW','pianostring','roundSTMtip','UTB_FET','WaveSimulation'];	
	
	for(var i=0,temp = "SELECT cluster, scienceAppName, simulationUuid, jobExecTime, jobStatus, jobData FROM EDSIM_SimStats_Details WHERE scienceAppName=\""+name[0]+"\" ORDER BY jobEndDt";i<name.length;i++,temp = "SELECT cluster, scienceAppName, simulationUuid, jobExecTime, jobStatus, jobData FROM EDSIM_SimStats_Details WHERE scienceAppName=\""+name[i]+"\" ORDER BY jobEndDt")
	{
		(function(){
			var sql=temp;
			connection.query(sql,  function (err, rows, fields) {
			console.log('get data from mysql server p1');
  			//rows에는 결과 데이터 배열이, fields는 결과 데이터에 포함된 칼럼들의 이름과 유형을 포함한 상세 정보 배열이 담겨 있습니다.
  			if (err) throw err;
  			console.log(rows.length);		
  			for(var i=0;i<rows.length;i++)
    		{
    			const nd = new Mysql();
				nd.cluster=rows[i].cluster;
				nd.scienceAppName=rows[i].scienceAppName; 
				nd.simulationUuid=rows[i].simulationUuid;
				nd.jobExecTime=rows[i].jobExecTime;
				nd.jobStatus=rows[i].jobStatus;
				nd.jobData=rows[i].jobData;
				nd.save();
				//console.log('save '+i+'/ '+rows.length);
    		}
  		console.log('save complete'+' '+rows[0].scienceAppName);
		});
		}());
		if(i==name.length/2-1) console.log('end ssave seq');
	}

	
}
//(function pew(){
//});
/*
var LCA="SELECT cluster, scienceAppName, simulationUuid, jobExecTime, jobStatus, jobData FROM EDSIM_SimStats_Details WHERE scienceAppName=\"LCAODFTLab\" ORDER BY jobEndDt";
	connection.query(LCA,  function (err, rows, fields) {
			console.log('get data from mysql server p1');
  			//rows에는 결과 데이터 배열이, fields는 결과 데이터에 포함된 칼럼들의 이름과 유형을 포함한 상세 정보 배열이 담겨 있습니다.
  			if (err) throw err;
  			console.log(rows.length);		
  			for(var i=0;i<rows.length;i++)
    		{
    			const nd = new Mysql();
				nd.cluster=rows[i].cluster;
				nd.scienceAppName=rows[i].scienceAppName; 
				nd.simulationUuid=rows[i].simulationUuid;
				nd.jobExecTime=rows[i].jobExecTime;
				nd.jobStatus=rows[i].jobStatus;
				nd.jobData=rows[i].jobData;
				nd.save();
				//console.log('save '+i+'/ '+rows.length);
    		}
  		console.log('save complete'+' '+rows[0].scienceAppName);
		});
*/
function dtosql(date)
{	var temp=date+'';
	var month=['pew','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var conv=temp.split(' ');
	console.log(conv[3]+"_"+conv[1]+"_"+conv[2]);
	for(var i=1;i<month.length;i++)
	{
		if(conv[1]==month[i]&&i<10)conv[1]='0'+i;
		else if (conv[1]==month[i] && i>=10) conv[1]=i+'';
	}
	var result="\""+conv[3]+"-"+conv[1]+"-"+conv[2]+" "+conv[4]+"\"";
	console.log('parsing result '+temp+' to '+result);
	return result;
}

async function test_load()
{
	var jdate=new Array(); //string data compare for date mysql -> javascript
	for(var i=0;i<2;i++) {jdate[i]=new Date();}
	var date=new Array(); //string data use in sql pure  mysql data
	var sql="SELECT jobEndDt, cluster, scienceAppName, simulationUuid, jobExecTime, jobStatus, jobData FROM EDSIM_SimStats_Details WHERE jobEndDt is not null AND jobEndDt BETWEEN \"2016-06-2 00:00:00\" AND date_add(\"2016-06-2 00:00:00\",interval 30 day) ORDER BY jobEndDt";
	//var sql="SELECT jobEndDt, cluster, scienceAppName, simulationUuid, jobExecTime, jobStatus, jobData FROM EDSIM_SimStats_Details WHERE jobEndDt is not null AND jobEndDt BETWEEN Wed Jun 29 2016 19:05:21 GMT-0400 (EDT) AND date_add(Wed Jun 29 2016 19:05:21 GMT-0400 (EDT),interval 30 day) ORDER BY jobEndDt"
	//connection and send query must return date info
	//for(i=0;jdate[0].getDate()+30<=jdate[1];i++)
	//console.log("==========start==========");
	//for(var a=0;a<3;a++)
	for(var a=0;a<3;a++)
	//for(var a=0;a<3;a++,sql = "SELECT jobEndDt, cluster, scienceAppName, simulationUuid, jobExecTime, jobStatus, jobData FROM EDSIM_SimStats_Details WHERE jobEndDt is not null AND jobEndDt BETWEEN "+date[1]+" AND date_add("+date[1]+",interval 30 day) ORDER BY jobEndDt")
	{
		
		//first - second - second
		(await function(){
		var ac=a;
		//console.log(ac);
		connection.query(sql,async function (err, rows, fields) 
		{
			console.log(ac);
			date[0]=rows[0].jobEndDt;
  			date[1]=rows[rows.length-1].jobEndDt;
  		
  			if(err) throw err;
  			console.log("Before__Date : "+date[0]+" "+date[1]); //!!
  			console.log("Before__sql : "+sql); //update ok..
  			console.log('get data from server '+rows.length);
  			console.log('========')
  			for(var i=0;i<rows.length;i++)
  			{
  				var nd = new Mysql();
				nd.cluster=rows[i].cluster;
				nd.scienceAppName=rows[i].scienceAppName; 
				nd.simulationUuid=rows[i].simulationUuid;
				nd.jobExecTime=rows[i].jobExecTime;
				nd.jobStatus=rows[i].jobStatus;
				nd.jobData=rows[i].jobData;
				await nd.save();
  			}
  			console.log("save seq end "+rows.length);
  			jdate[0]=new Date(date[0]);
			jdate[1]=new Date(date[1]);
			//console.log("After__Date : "+jdate[0]+" "+jdate[1]);
			date[1]=dtosql(date[1]);
			sql = "SELECT jobEndDt, cluster, scienceAppName, simulationUuid, jobExecTime, jobStatus, jobData FROM EDSIM_SimStats_Details WHERE jobEndDt is not null AND jobEndDt BETWEEN "+date[1]+" AND date_add("+date[1]+",interval 30 day) ORDER BY jobEndDt";
			console.log("After__sql : "+sql);
			console.log("==========");
		});
		}());
	}

}



//var sql = "SELECT cluster, scienceAppName, simulationUuid, jobExecTime, jobStatus, jobData FROM EDSIM_SimStats_Details ORDER BY jobEndDt";
//sql 일주일씩 받아와서 적재문제를 해결해보자 --> sql 수정 및 node js 서버 쓰레드 작업?? 일단 몰게쓰


	
//module.exports=router; // app.js app.use('/users',require('./api/user')); 에서 
