// jobData parsing and restore
const express = require('express');
const router=express.Router();
const mongodb=require('../../app')
var name=['LCAODFTLab','2D_Comp_P','2D_Incomp_P','KFLOW_EDISON_4','KFLOW_EDISON_5','SNUFOAM_ShipRes','dmd_pol','eklgcmc2','mc_nvt','PKsimEV','Single_Cell_Electrophysiology','acuteSTMtip','BAND_DOSLab','coulombdart','gravityslingshot','PhaseDiagramSW','pianostring','roundSTMtip','UTB_FET','WaveSimulation'];
//var name=['LCAODFTLab','2D_Comp_P','2D_Incomp_P','KFLOW_EDISON_4','KFLOW_EDISON_5','SNUFOAM_ShipRes','dmd_pol','eklgcmc2','mc_nvt','Single_Cell_Electrophysiology','acuteSTMtip','BAND_DOSLab','coulombdart','gravityslingshot','PhaseDiagramSW','pianostring','roundSTMtip','UTB_FET','WaveSimulation'];
//var comp;
var ccount=1;
//call data -> parse -> (make schema , make model just once by sciencAppName) -> save parse data
(function EdisonData_refine_func()
{
	//var jobdata=call_data(name[0]);
	 for(let i=0;i<name.length;i++)
	 {	
	// 	console.log(name[i]);
	 	var jobdata=call_data(name[i]);
	 }
}());


function call_data(name)
{
	//find func support many obejcts
	mongodb.connect.models.EdisonData.find({'scienceAppName':name},function(err,EdisonData){
		if(err)
		{
			console.err(err);
			throw err;
		}
		//console.log('call data '+name);

		//for(let i=0;i<1;i++)
		for(let i=0;i<EdisonData.length;i++)
		{
			if(i==0) //make schema and compile model
			{
					Schema = mongodb.mongo.Schema({
					cluster: String,
    				scienceAppName : String,
    				simulationUuid: String,
    				jobExecTime : String,
    				jobStatus : String,
    				parameter : Array,
    				values : Array			
				});
				if(name=='2D_Comp_P') name='Comp_P_2D'
				else if(name=='2D_Incomp_P') name='Incomp_P_2D'
				Model=mongodb.mongo.model(name,Schema);
				//console.log(Model);
			}
			//parse
			var Schema,Model;
			var data=parse_jobdata(EdisonData[i].jobData,name);
			if(data==0) continue;
			// if(i==0) comp=data;
			// else if (comp!=data)
			// {
			// 	console.log('hmm '+name+' '+data+' '+comp);
			// 	comp=data;
			// }
			let parameter=new Array();
			let values=new Array();
			let parameter_counter=0,values_couter=0;
			//console.log(data);
			for(let i=0;i<data.length;i++)
			{
				if(i%2==0) parameter[parameter_counter++]=data[i];
				else values[values_couter++]=data[i]
			}
			//console.dir(mongodb);
			//save
			let save_data=new Model();
			save_data.cluster=EdisonData[i].cluster;
			save_data.scienceAppName=EdisonData[i].scienceAppName;
			save_data.simulationUuid=EdisonData[i].simulationUuid;
			save_data.jobExecTime=EdisonData[i].jobExecTime;
			save_data.jobStatus=EdisonData[i].jobStatus;
			save_data.parameter=parameter;
			save_data.values=values;
			// console.log(save_data);
			save_data.save();
			// if(i==0)
			// {
			// 	console.log(save_data);
			// }
		}
		console.log(name+" save complete "+ccount);
		ccount=ccount+1;
	});

	return 1;
}

function parse_jobdata(jobdata,name)
{	
	//console.log(jobdata);
	let data=new Array();; //짝=param name 홀=param variable
	let findtext='file-content'
	let findlength=findtext.length;
	let count=0;
	let start=jobdata.indexOf(findtext);
	let split_file_content=jobdata.substring(start+findlength+3,jobdata.length);
	let end=split_file_content.indexOf('\"');
	split_file_content=split_file_content.substring(0,end-2);
	//console.log(split_file_content);
	var split_param_value;
	let temp="";
	let attribute_number;

	split_file_content=split_file_content.split('\\n');
	attribute_number=split_file_content.length;

	if(name=='mc_nvt'&&attribute_number!=11) return 0;
	else if(name=='UTB_FET'&&attribute_number!=36) return 0;
	else if(name=='Single_Cell_Electrophysiology'&&attribute_number!=16) return 0;
	else if(name=='PKsimEV'&&attribute_number!=10) return 0;
	else if(name=='eklgcmc2'&&attribute_number!=29) return 0;

	for(let i=0;i<split_file_content.length;i++)
	{
		if(-1!=split_file_content[i].indexOf('\"\}]')&&i==split_file_content.length-1)
		{
			break;
		}

		split_param_value=split_file_content[i].split(/[\s,=:]+/);
		data[count++]=split_param_value[0];
		if(split_param_value.length>2)
		{
			for(let j=1;j<split_param_value.length;j++)
			{
				temp=temp.concat(split_param_value[j]+' ');
			}
			//console.log(temp);
			data[count++]=temp;
			temp="";
		}
		else
		{
			//console.log('normal');
			data[count++]=split_param_value[1];
		}

		//data[count++]=temp[0];
		//console.log(data[count-1]);
	}

	//console.log(temp);
	//return pew;
	return data;
}



module.exports=router; 