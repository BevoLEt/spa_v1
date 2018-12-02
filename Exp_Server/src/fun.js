function getScienceAppName () { 
    var e = document.getElementById("cluster_box");
    var cluster_name = e.options[e.selectedIndex].value;

    $.ajax({
        url : "http://155.230.34.149:3000/spa/clusters/"+cluster_name,
        type:'GET',
        dataType:'json',
        // 서버로 값을 성공적으로 넘기면 처리하는 코드부분 입니다.
        success : function (data) {
            // 변경된 태그 부분을 넘어온 index 값으로 찾은 뒤 on/off를 변경합니다.
            let i;
            for(let i=0;i<data.length;i++)
            {
                $('#scienceappname_box').append('<option value='+data[i]+'>'+data[i]+'</option>')
            }
        },
        failure:function(error){
            alert(error.d);
        }
    });
}

function reset() { 
    var a=document.getElementById("scienceappname_box");
    a.selectedIndex = 0;
    var b=document.getElementById("parameter_box");
    b.selectedIndex=0;
    var c=document.getElementById("cluster_box");
    c.selectedIndex = 0;

   //document.getElementById("scienceappname_box").reset();
   //document.getElementById("parameter_box").reset();
   //document.getElementById("cluster_box").reset();
}



//ex http://155.230.34.149:3000/spa/clusters/EDISON-CFD/2D_Incomp_P/parameters_values?par[]=test1&par[]=test2&par[]=test3&var[]=var1&var[]=var2&var[]=var3
//requset result predict result
//router.get('/clusters/:cluster_name/:scienceAppName/parameters_values',function(req,res){

function getResult() { 
    var a = document.getElementById("cluster_box");
    var cluster_name = a.options[a.selectedIndex].value;
    var e = document.getElementById("scienceappname_box");
    var scienceappname_name = e.options[e.selectedIndex].value;
    var p=document.getElementsByClassName("Parameter");
    var v=document.getElementsByClassName("Value");
    var parameters_values="?";
    var resut_label=document.getElementById('result');

    for (let i=0;i<p.length;i++) {
        if(i==0) parameters_values=parameters_values.concat("par[]="+p[i].innerText);
        else parameters_values=parameters_values.concat("&par[]="+p[i].innerText);
        //console.log(parameters_values);
        //console.log(p[i].innerText);
    }
    for (let i=0;i<v.length;i++) {
        parameters_values=parameters_values.concat("&var[]="+v[i].value);
        //console.log(parameters_values);
        //console.log(v[i].value);
    }
    //console.log(parameters_values);
 
    ///cluster/:cluster_name/:scienceAppName
    $.ajax({
        url : "http://155.230.34.149:3000/spa/clusters/"+cluster_name+"/"+scienceappname_name+"/parameters_values"+parameters_values,
        type:'GET',
        dataType:'json',
        // 서버로 값을 성공적으로 넘기면 처리하는 코드부분 입니다.
        success : function (data) {
            resut_label.innerText="OK";
            //'#result').innerHTML="OK";
        },
        failure:function(error){
            alert(error.d);
        }
    });
}

function getParameter () { 
    var a = document.getElementById("cluster_box");
    var cluster_name = a.options[a.selectedIndex].value;
    var e = document.getElementById("scienceappname_box");
    var scienceappname_name = e.options[e.selectedIndex].value;
    ///cluster/:cluster_name/:scienceAppName
    $.ajax({
        url : "http://155.230.34.149:3000/spa/clusters/"+cluster_name+"/"+scienceappname_name,
        type:'GET',
        dataType:'json',
        // 서버로 값을 성공적으로 넘기면 처리하는 코드부분 입니다.
        success : function (data) {
            // 변경된 태그 부분을 넘어온 index 값으로 찾은 뒤 on/off를 변경합니다.
            let i;
            for(let i=0;i<data[0].length;i++)
            {   
                $('#parameter_table').append('<tr><td class="Parameter">'+data[0][i]+'</td><td><input class= "Value" type="text" name="box'+i+'"></td></tr>')
                //$('#parameter_table').append('<tr><td>'+data[0][i]+'</td><td><input type="text" name="box'+i+'"></td></tr>')
            }
        },
        failure:function(error){
            alert(error.d);
        }
    });
}
//$('#next1').click(getScienceAppName());
