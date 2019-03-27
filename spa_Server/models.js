var Schemas={};
//just schema ver
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
	
	//console.log('make TempSchema');

	return tempSchema;
};

Schemas.createLatest1Schema=function(mongo){
	//mongodb part
	var latest1Schema=mongo.Schema({
	cluster: String,
	scienceAppName : String,
	simulationUuid: String,
	jobExecTime : String,
	jobStatus : String,
	parameter : Array,
	values : Array
	});

	return latest1Schema;
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
	
	//console.log('make EdisonSchema');

	return edisonSchema;
};

Schemas.createEdisonSetSchema=function(mongo){
	//mongodb part
	var edisonsetSchema=mongo.Schema({
	cluster: String, 
	scienceAppName: String, 
	simulationUuid: String,
	jobExecTime: String, 
	jobStatus: String,
	jobData: String
	});
	
	//console.log('make EdisonSchema');

	return edisonsetSchema;
};

Schemas.createRefine_EdisonSetSchema=function(mongo){
	//mongodb part
	var refine_edisonsetSchema=mongo.Schema({
		cluster: String,
		scienceAppName : String,
		simulationUuid: String,
		jobExecTime : String,
		jobStatus : String,
		parameter : Array,
		values : Array	
	});
	
	//console.log('make EdisonSchema');

	return refine_edisonsetSchema;
};
Schemas.createInput_EdisonSchema=function(mongo){
	//mongodb part
	var refine_edisonsetSchema=mongo.Schema({
		cluster: String,
		scienceAppName : String,
		simulationUuid: String,
		jobExecTime : String,
		jobStatus : String,
		parameter : Array,
		values : Array	
	});
	
	//console.log('make EdisonSchema');

	return refine_edisonsetSchema;
};

// 	Schema = mongodb.mongo.Schema({
	// 	cluster: String,
	// 	scienceAppName : String,
	// 	simulationUuid: String,
	// 	jobExecTime : String,
	// 	jobStatus : String,
	// 	parameter : Array,
	// 	values : Array			
	// });
	// Model=mongodb.mongo.model('Refine_EdisonSetData',Schema);

// // compiels our schema into a model
// var TempSchema = mongo.model('TempSchema', userSchema);
// var Mysql=mongo.model('EdisonSchema',EdisonSchema.createSchema);

// userSchema.methods.speak=function(){
// 	var greeting=this.name
// 	?"Saved at Server and Name is"+this.name
// 	:"Something wrong"
// 	console.log(greeting);
module.exports=Schemas;