
//장르 버튼 클릭하면 리스트 열고 닫히기
function genreListOpenClose(){
  var list = document.getElementById("Layer1");
  var button = document.getElementById("profile");
  var body = document.body;
  var target = document.getElementById("Layer1");

  //장르 버튼 클릭하면 리스트 오픈(touchstart)
  button.addEventListener("click", function(e){
    if(list.style.display ==="none"){
      list.style.display = "block";
    }
    else {
      list.style.display = "none";
    }   
    e.stopPropagation();
  } , false);

  //다른 부분을 클릭하면 리스트 닫기
  body.addEventListener("click", function(e){
  if(e.target.id != "Layer1" && list.style.display === "block")
    list.style.display = "none";
  }, false);
}

//델리게이트 

window.addEventListener("load", function(){
  genreListOpenClose();
});


var data;


