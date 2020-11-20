const express = require('express');
const router=express.Router();
const mongodb=require('../../app');
const R =require('r-script');
const fs = require("fs");
var child_process=require('child_process');
var exec=child_process.exec;

//router에 의해 바로 경로가 main folder기준으로 잡힘 시작 
//api call ip:port/spa/~~~
(function Test()
{ 



}());


//main page
router.get('/',function(req,res){
  res.render('main');
});
router.get('/test/:a/:b',function(req,res){
   var a=req.params.a;
   var b=req.params.b;

   var cmd='Rscript ./apps/api/log_wrapper.R '+a.toString()+' '+b.toString();

  exec(cmd,(error,stdout,stderr)=>{
    if(error){
      console.error(error);
      return ;
    }
    console.log(stdout);
    res.send(stdout);
  })
  
});
//predict page  = Job Completion Time Estimation
router.get('/predict',function(req,res){
  mongodb.connect.models.Refine_EdisonSetData.find(function(err,Refine_EdisonSetData){
    let cluster_set=new Set();
    let array;
    
    if(err)
    {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    for(let i=0;i<Refine_EdisonSetData.length;i++)
    {
    cluster_set.add(Refine_EdisonSetData[i].cluster);
    }
    array=Array.from(cluster_set);
    console.log(array);
    res.render('predict',{cluster:array});   
  });
  //res.render('predict');
});
//body -- poset params -- get

//--- predict API list ---//
//get cluster
router.get('/clusters',function(req,res){
  mongodb.connect.models.Refine_EdisonSetData.find(function(err,Refine_EdisonSetData){
    let cluster_set=new Set();
    let array;
    
    if(err)
    {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    for(let i=0;i<Refine_EdisonSetData.length;i++)
    {
      cluster_set.add(Refine_EdisonSetData[i].cluster);
    }
    array=Array.from(cluster_set);
    console.log('call get cluster name api');
    console.log(array);
    //res.render('predict',{cluster:array});
    res.json(array);
  });
});

//get scienceAppName -from cluster
router.get('/scienceAppName/:cluster_name',function(req,res){
  mongodb.connect.models.Refine_EdisonSetData.find({'cluster':req.params.cluster_name},function(err,Refine_EdisonSetData){
    let scienceAppName_set=new Set();
    let array;
    
    console.log(req.params.cluster_name);
    if(err)
    {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    for(let i=0;i<Refine_EdisonSetData.length;i++)
    {
    scienceAppName_set.add(Refine_EdisonSetData[i].scienceAppName);
    }
    array=Array.from(scienceAppName_set);
    console.log('call get scienceAppName api');
    console.log(array);
    res.json(array);
  });
});


//get param -from cluster,scienceAppName
router.get('/parameter/:cluster_name/:scienceAppName',function(req,res){
  mongodb.connect.models.Refine_EdisonSetData.find({'scienceAppName':req.params.scienceAppName},function(err,Refine_EdisonSetData){
    let param_set=new Set();
    let array;

    console.log(req.params.scienceAppName);
    if(err)
    {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    for(let i=0;i<Refine_EdisonSetData.length;i++)
    {
      param_set.add(Refine_EdisonSetData[i].parameter);
    }
    array=Array.from(param_set);
    console.log('call get parameter api');
    console.log(array);
    res.json(array);
  });
});
//http://127.0.0.1:3000/spa/clusters/EDISON-CFD/2D_Incomp_P/parameters_values?par[]=test1&par[]=test2&par[]=test3&var[]=var1&var[]=var2&var[]=var3
//ex http://127.0.0.1:3000/spa/clusters/EDISON-CFD/2D_Incomp_P/value?par[]=test1&par[]=test2&par[]=test3
//requset result predict result
router.get('/predictResult/:cluster_name/:scienceAppName/parameters_values',function(req,res){
  let startTime=new Date().getTime();
  console.log('call get predict result api');

  let c=req.params.cluster_name;
  let p=req.params.scienceAppName;
  let e=req.params.values;
  let node2r_values='';

  console.log(c);
  console.log(p);
  console.log(req.query.par);
  console.log(req.query.var);

  for(let i=0;i<req.query.var.length;i++)
  {
    node2r_values=node2r_values.concat(req.query.var[i]+' ');
  }
  //var cmd='Rscript ./apps/api/log_wrapper.R '+req.query.var[0].toString()+' '+req.query.var[1].toString();
  var cmd='Rscript ./apps/api/wrapper.R '+node2r_values;
  console.log(cmd);

  exec(cmd,(error,stdout,stderr)=>{
    if(error){
      throw error ;
    }
    console.log(stdout);
    let endTime=new Date().getTime();
    let resTime=(endTime-startTime)/1000;

    res.json(stdout+' Time : '+resTime);
  });

  
});
//--- Statistics API list ---//
//statistics page  = Job Completion Time Estimation
router.get('/statistics',function(req,res){
  mongodb.connect.models.Refine_EdisonSetData.find(function(err,Refine_EdisonSetData){
    let cluster_set=new Set();
    let array;
    
    if(err)
    {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    for(let i=0;i<Refine_EdisonSetData.length;i++)
    {
    cluster_set.add(Refine_EdisonSetData[i].cluster);
    }
    array=Array.from(cluster_set);
    console.log(array);
    res.render('statistics',{cluster:array});   
  });
  //res.render('predict');
});


//get result of statistic
router.get('/statisticsResult/:cluster_name/:scienceAppName',function(req,res){

  let name=['LCAODFTLab','2D_Comp_P','2D_Incomp_P','KFLOW_EDISON_4','KFLOW_EDISON_5','SNUFOAM_ShipRes','dmd_pol','eklgcmc2','mc_nvt','PKsimEV','Single_Cell_Electrophysiology','acuteSTMtip','BAND_DOSLab','coulombdart','gravityslingshot','PhaseDiagramSW','pianostring','roundSTMtip','UTB_FET','WaveSimulation'];
  let model;
  let number=req.params.number;
  eval("model=mongodb.connect.models.Latest1_"+req.params.scienceAppName); 

  console.log('call get result of statistics api');
  model.aggregate([
        {
          $project:{
            parameter:1,
            values:1
        }},
        { $group: {
            _id: "$values",
            count: {$sum: 1}
        }},
        {
          $sort:{count:-1}
        },
        {
          $limit: 100
        }
    ], function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('statistics api call success');
        //console.log(result);
        res.json(result);
    });
});


module.exports=router; 