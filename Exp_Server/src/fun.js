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

//$('#next1').click(getScienceAppName());
