//로드되면 clickSeeMore()함수 호출
//clickSeeMore()함수 : 모두보기 버튼을 클릭하면 getdata함수 호출
//getdata 함수 : 제이슨파일을 서버로 보내고 받는다. 
//네개의 카드를 포함하는 card_container를 잡아서 innerHTML로 서버에서온 제이슨파일의 데이타를 거기에 넣어줌
//makeCardElement: 받아온 제이슨 파일의 길이만큼 템플릿에서 이미지링크 영역에 제이슨 파일의 데이터를 innerHTML로 넣어준다

window.addEventListener("load", function(){
  clickSeeMore(); 
});

var sTemplate = '<div id="card_container"><div class="card_wrap"><div class="card_shadow"></div><div class="poster_container"><img class="poster" src="<%=ImageLink%>"><div class="top_gradation"></div><div class="hover_container"></div><div class="black_bg"></div><div class="hover_contents"></div><div class="btn evaluate_container"></div><span class="text"></div><div class="btn evaluate_container"></div><span class="text"></div></div><div class="card_wrap"><div class="card_shadow"></div><div class="poster_container"><img class="poster" src="<%=ImageLink%>"><div class="top_gradation"></div><div class="hover_container"></div><div class="black_bg"></div><div class="hover_contents"></div><div class="btn log_container"></div><span class="text"></div><div class="btn evaluate_container"></div><span class="text"></div></div><div class="card_wrap"><div class="card_shadow"></div><div class="poster_container"><img class="poster" src="<%=ImageLink%>"><div class="top_gradation"></div><div class="hover_container"></div><div class="black_bg"></div><div class="hover_contents"></div><div class="btn log_container"></div><span class="text"></div><div class="btn evaluate_container"></div><span class="text"></div></div><div class="card_wrap"><div class="card_shadow"></div><div class="poster_container"><img class="poster" src="<%=ImageLink%>"><div class="top_gradation"></div><div class="hover_container"></div><div class="black_bg"></div><div class="hover_contents"></div><div class="btn log_container"></div><span class="text"></div><div class="btn evaluate_container"></div><span class="text"></div></div></div>';

//모두보기(see_all) 버튼을 클릭하면 getData함수 호출 
function clickSeeMore(){
  var showMore=document.querySelector(".see_all");
 
  showMore.addEventListener('click', function(e){
    e.preventDefault();
    getData();
  },false);
}

//ajax
function getData(){
  var request = new XMLHttpRequest();
  var url = "data/movies.json";  //디비가 저장될 파일 명이 필요함. 
  request.open("GET" , url , true);
  request.send(null);
  
  request.onreadystatechange = function() {

    if(request.readyState === 4 && request.status === 200) {
      result = request.responseText;
      result = JSON.parse(result);

    var tobechanged = document.querySelector("#card_container");
    var legacyData  = tobechanged.innerHTML;
    tobechanged.innerHTML= legacyData + makeCardElement(result);
    }
  };
}
 
function makeCardElement(data){
    var resultList = "";
 
    for(var i = 0; i < data.length; i++){
        var result = sTemplate.replace("<%=ImageLink%>", data[i].ImageLink)
        .replace("<%=ImageLink%>", data[i].ImageLink2)
        .replace("<%=ImageLink%>", data[i].ImageLink3)
        .replace("<%=ImageLink%>", data[i].ImageLink4)
        resultList += result;
      }
    return resultList;
}
