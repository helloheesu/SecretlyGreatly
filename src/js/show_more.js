//sublime 에서 jshint 플러그인을 적용해서 사용해보기.
window.addEventListener("load", function(){
  seeMore();
  console.log('good-bye');
  getData("data/movies.json");
  changeData();
});

//더보기 
function seeMore(){
  //var showMore=document.querySelector(".see_all");
    var showMore = document.getElementsByClassName("see_all");

  showMore.addEventListener('click', function(e){
    //loading();
    
    getData("js/movies.js");
  },false);
}

function makeCardElement(data){
    var done = "";
 
    for(var i = 0; i < data.length; i++){
        var maked = sTemplate.replace("<%=link%>", data[i].PageLink);
        // .replace("<%=ImageLink%>", data[i].ImageLink)
        // .replace("<%=top_gradation%>",data[i].top_gradation)
        // .replace("<%=hover_container%>",data[i].hover_container)
        // .replace("<%=black_bg%>",data[i].black_bg)
        // .replace("<%=hover_contents%>",data[i].hover_contents)
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
  
  request.onreadystatechange = function() {

    if(request.readyState === 4 && request.status === 200) {
      result = request.responseText;
      result = JSON.parse(result);
     
     var tobechanged = document.querySelector(".poster_container");
     tobechanged.innerHTML = makeCardElement(result);
    }
  };
}
