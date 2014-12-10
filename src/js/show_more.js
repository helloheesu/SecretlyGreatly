 console.log('good-bye');
 
//seeMore 발생시키는 코드?
window.addEventListener("load", function(){
  seeMore();

  getData("data/movies.json"); 
 changeData();
 //makeCardElement(data);
   
});


var data;


//더보기 
function seeMore(){ 
  //var showMore=document.querySelector(".see_all");
    var showMore = document.getElementsByClassName("see_all");

  showMore.addEventListener('click', function(e){ 
    //loading();
    
    getData("js/movies.js");
  },false);
}

   //카드 템플릿의 요소들 담기
// var sTemplate = "<div class='poster_container'>"
// +  "<img src='<%=ImageLink%>'>"
// +  "<div class='top_gradation'><%=top_gradation%></div>"
// +  "<div class='hover_container'><%=hover_container%></div>"
// +  "<div class='black_bg'><%=black_bg%></div>"
// +  "<div class='hover_contents'><%=hover_contents%></div>"
// +  "<div class='btn log_container'><%=btn log_container%></div>"
// +  "<span class='text'><%=내역보기%></div>"
// +  "<div class='btn evaluate_container'><%=btn evaluate_container%></div>"
// +  "<span class='text'><%=평가하기%></div>"

// +"</div>" 






var sTemplate = "<div class='poster_container'>"
+  "<img src='<%=ImageLink%>'>"
+  "<div class='top_gradation'></div>"
+  "<div class='hover_container'></div>"
+  "<div class='black_bg'></div>"
+  "<div class='hover_contents'></div>"
+  "<div class='btn log_container'></div>"
+  "<span class='text'></div>"
+  "<div class='btn evaluate_container'></div>"
+  "<span class='text'></div>"

+"</div>"     


function makeCardElement(data){
    var done = "";
 
    for(var i = 0; i < data.length; i++){
        var maked = sTemplate.replace("<%=link%>", data[i].PageLink)
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
function changeData() { 
  var target = document.getElementsByClassName("see_all");

  target.addEventListener('click', function(ev){
  //loading();
  console.log('hi');
  getData(e.target.className);
  console.log('hello');
 },false);


function getData(dataset) { 
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
  }
}







