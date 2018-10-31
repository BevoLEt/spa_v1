var TempSchema={};
var EdisonSchema={};

//use app.js const mongo=require('moongoose')
TempSchema.createSchema=function(mongo){
	//mongodb part
	var TempSchema = mongo.Schema({
	query: String,
    name: String,
    title_1: String,
    title_2: String,
    inputdataall: String
	});
	
	console.log('make TempSchema');

	return TempSchema;
};

EdisonSchema.createSchema=function(mongo){
	//mongodb part
	var mysqlSchema=mongo.Schema({
	cluster: String, 
	scienceAppName: String, 
	simulationUuid: String,
	jobExecTime: String, 
	jobStatus: String,
	jobData: String
	});
	
	console.log('make EdisonSchema');

	return mysqlSchema;
};



// // compiels our schema into a model
// var TempSchema = mongo.model('TempSchema', userSchema);
// var Mysql=mongo.model('EdisonSchema',EdisonSchema.createSchema);

// userSchema.methods.speak=function(){
// 	var greeting=this.name
// 	?"Saved at Server and Name is"+this.name
// 	:"Something wrong"
// 	console.log(greeting);


module.exports=EdisonSchema;
module.exports=TempSchema;