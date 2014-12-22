window.addEventListener("load", function(){
  clickSeeMore(); 
  console.log('start');
});

var sTemplate = '<div id="card_container"><div class="card_wrap"><div class="card_shadow"></div><div class="poster_container"><img class="poster" src="<%=ImageLink%>"><div class="top_gradation"></div><div class="hover_container"></div><div class="black_bg"></div><div class="hover_contents"></div><div class="btn evaluate_container"></div><span class="text"></div><div class="btn evaluate_container"></div><span class="text"></div></div><div class="card_wrap"><div class="card_shadow"></div><div class="poster_container"><img class="poster" src="<%=ImageLink%>"><div class="top_gradation"></div><div class="hover_container"></div><div class="black_bg"></div><div class="hover_contents"></div><div class="btn log_container"></div><span class="text"></div><div class="btn evaluate_container"></div><span class="text"></div></div><div class="card_wrap"><div class="card_shadow"></div><div class="poster_container"><img class="poster" src="<%=ImageLink%>"><div class="top_gradation"></div><div class="hover_container"></div><div class="black_bg"></div><div class="hover_contents"></div><div class="btn log_container"></div><span class="text"></div><div class="btn evaluate_container"></div><span class="text"></div></div><div class="card_wrap"><div class="card_shadow"></div><div class="poster_container"><img class="poster" src="<%=ImageLink%>"><div class="top_gradation"></div><div class="hover_container"></div><div class="black_bg"></div><div class="hover_contents"></div><div class="btn log_container"></div><span class="text"></div><div class="btn evaluate_container"></div><span class="text"></div></div></div>';


//모두보기(see_all) 버튼을 클릭하면 getData함수 호출 
function clickSeeMore(){
  var showMore=document.querySelector(".see_all");
  showMore.addEventListener('click', function(e){
    e.preventDefault();
    getData();
    console.log('clickSeeMore'); //확인완료 
  },false);
}

//ajax
function getData(){
  var request = new XMLHttpRequest();
  var url = "/shows";  //디비가 저장될 파일 명이 필요함. 
  request.open("GET" , url , true);
  console.log('getData1');

  request.send(null);
  console.log('getData2');

  request.onreadystatechange = function() { //콜백함수 이벤트큐에 보관이 된다. 
  //불리지 않아도 실행이 된다. 실행될 조건이 성립이되면 불리지 않아도 실행된다. 조건은 아래if문
  //readystate는 서버에서 도착했다고 알려주는 번호. 

    if(request.readyState === 4 && request.status === 200) {
      result = request.responseText;
      result = JSON.parse(result);
      var tobechanged = document.querySelector("#card_container");
      // var tobechanged = document.querySelector(".card_container");
      // var legacyData  = tobechanged.innerHTML;
      // tobechanged.innerHTML= legacyData + makeCardElement(result); 

      tobechanged.innerHTML = tobechanged.innerHTML + makeCardElement(result); //addjecentHTML
      tobechanged.insertAdjacentHTML("beforeend", makeCardElement(result));
    console.log('onreadystatechange');
    }
  };
}
 
function makeCardElement(data){
    var resultList = "";
 
    for(var i = 0; i < data.length; i++){
        var result = sTemplate.replace("<%=ImageLink%>", data[0].movie_img_url)
        .replace("<%=ImageLink%>", data[1].movie_img_url)
        .replace("<%=ImageLink%>", data[2].movie_img_url)
        .replace("<%=ImageLink%>", data[3].movie_img_url) // .replace("<%=ImageLink%>", data[i].ImageLink4)수정
        resultList += result;
      }//for 문 또는 recursive하게 돌리도록 한다. 
      console.log('makeCardElement');
    return resultList;
}