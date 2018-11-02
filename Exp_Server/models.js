var Schemas={};

//use app.js const mongo=require('moongoose')
Schemas.createTempSchema=function(mongo){
	//mongodb part
	var tempSchema = mongo.Schema({
	query: String,
    name: String,
    title_1: String,
    title_2: String,
    inputdataall: String
	});
	
	console.log('make TempSchema');

	return tempSchema;
};

Schemas.createEdisonSchema=function(mongo){
	//mongodb part
	var edisonSchema=mongo.Schema({
	cluster: String, 
	scienceAppName: String, 
	simulationUuid: String,
	jobExecTime: String, 
	jobStatus: String,
	jobData: String
	});
	
	console.log('make EdisonSchema');

	return edisonSchema;
};

// // compiels our schema into a model
// var TempSchema = mongo.model('TempSchema', userSchema);
// var Mysql=mongo.model('EdisonSchema',EdisonSchema.createSchema);

// userSchema.methods.speak=function(){
// 	var greeting=this.name
// 	?"Saved at Server and Name is"+this.name
// 	:"Something wrong"
// 	console.log(greeting);
module.exports=Schemas;