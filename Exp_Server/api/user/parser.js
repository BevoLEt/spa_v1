// jobData parsing and restore
const router=express.Router();
const mongodb=require('../../app')
var name=['LCAODFTLab','2D_Comp_P','2D_Incomp_P','KFLOW_EDISON_4','KFLOW_EDISON_5','SNUFOAM_ShipRes','dmd_pol','eklgcmc2','mc_nvt','PKsimEV','Single_Cell_Electrophysiology','acuteSTMtip','BAND_DOSLab','coulombdart','gravityslingshot','PhaseDiagramSW','pianostring','roundSTMtip','UTB_FET','WaveSimulation'];


//call data -> parse -> (make schema , make model just once by sciencAppName) -> save parse data
(function test()
{
	for(let i=0;i<name.length;i++)
	{
		var jobdata=call_data(name[i]);
		// var rejobdata=parse(jobdata);
		// if(i==0)
		// {
		// 	make schema,and model;
		// }
		// save_data();
	}
}());

function parse(jobdata)
{

	return data;
}

function call_data(name)
{
	mongodb.connect.models.EdisonData.findOne({'scienceAppName':name},function(err,user){
		if(err)
		{
			console.err(err);
			throw err;
		}
		console.dir(user);
		console.log(user);

		return user;
	});
}


// EdisonModel=mongo.model("EdisonData",EdisonSchema);
// 	//console.log('EdisonModel define');
// 	TempModel=mongo.model("TempData",TempSchema);
// const nd=new mongodb.connect.models.EdisonData();
//     			//const nd = new Mysql();
// 				nd.cluster=rows[i].cluster;
// 				nd.scienceAppName=rows[i].scienceAppName; 
// 				nd.simulationUuid=rows[i].simulationUuid;
// 				nd.jobExecTime=rows[i].jobExecTime;
// 				nd.jobStatus=rows[i].jobStatus;
// 				nd.jobData=rows[i].jobData;
// 				nd.save();
// 				//console.log('save '+i+'/ '+rows.length);

// Schemas.createEdisonSchema=function(mongo){
// 	//mongodb part
// 	var edisonSchema=mongo.Schema({
// 	cluster: String, 
// 	scienceAppName: String, 
// 	simulationUuid: String,
// 	jobExecTime: String, 
// 	jobStatus: String,
// 	jobData: String
// 	});
	
// 	//console.log('make EdisonSchema');

// 	return edisonSchema;
// };

module.exports=router; 