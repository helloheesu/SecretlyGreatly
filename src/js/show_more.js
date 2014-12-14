//sublime 에서 jshint 플러그인을 적용해서 사용해보기.
window.addEventListener("load", function(){
  registerEvent();
  // seeMore(); 
  //화면이 로딩이 되면 마우스로 모두보기를 누르면, 서버에 카드이미지를요청받아서
  //메인화면 카드 아래에 출력한다. 
  console.log('good-bye1');
  // getData("data/movies.json");
  changeData();
});

function registerEvent(){

}

//더보기 
function seeMore(){
  //var showMore=document.querySelector(".see_all");
    var showMore = document.getElementsByClassName("see_all");
console.log('good-bye!2');
  showMore.addEventListener('click', function(e){
    
    getData("js/movies.js");
  },false);
}

function makeCardElement(data){
    var done = "";
 
    for(var i = 0; i < data.length; i++){
        var maked = sTemplate.replace("<%=ImageLink%>", data[i].PageLink);
        done += maked;
      }
    return done;
}

//모두보기를 누르면 카드 더보기
function changeData(){
  var target = document.getElementsByClassName("see_all");

  target.addEventListener('click', function(ev){
  ev.preventDefault();
  //console.log('hi');
  getData(ev.target.className);
  //console.log('hello');
  },false);
}

function getData(dataset){
  var request = new XMLHttpRequest();
  var url = "data/movies.json";  //디비가 저장될 파일 명이 필요함. 
  request.open("GET" , url , true);
  request.send(null);
  
  request.onreadystatechange = function() { //콜백함수 이벤트큐에 보관이 된다. 
  //불리지 않아도 실행이 된다. 실행될 조건이 성립이되면 불리지 않아도 실행된다. 조건은 아래if문
  //readystate는 서버에서 도착했다고 알려주는 번호. 

    if(request.readyState === 4 && request.status === 200) {
      result = request.responseText;
      result = JSON.parse(result);
     //문자열 형태로 서버-클라이언트 사이에 통신한다. (타입없음)
     //문자열 파싱을 json형식으로 하는 과정을 거침. 
     var tobechanged = document.querySelector(".poster_container");
     tobechanged.innerHTML = makeCardElement(result);
    }
  };
}
