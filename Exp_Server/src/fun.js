function getScienceAppName () { 
    var index = $('#cluster_box').selectedIndex;
    var cluster_name = $('#cluster_box').options[index].value;
    $.ajax({
        url : "http://155.230.34.149:3000/spa/clusters/"+cluster_name,
        type:'GET',
        dataType:'json',
        // 서버로 값을 성공적으로 넘기면 처리하는 코드부분 입니다.
        success : function (data) {
            // 변경된 태그 부분을 넘어온 index 값으로 찾은 뒤 on/off를 변경합니다.
            alert(data);
            console.log(data);
        },
        failure:function(error){
            alert(error.d);
        }
    });
}

$('#next1').click(getScienceAppName())