
//장르 버튼 클릭하면 리스트 열고 닫히기
function profileListOpenClose(){
  //element : el , array : a , object(hash table) : ht, number : n , string : s
  var elList = document.querySelector("#Layer1");
  var elButton = document.querySelector(".profile");
  var elBody = document.body;
  var elTarget = document.querySelector("#Layer1");

  //장르 버튼 클릭하면 리스트 오픈(touchstart)

  //아래 eventListener가 두개 이상일 수 있음. 그러면 문제가 generListOpenClose메서드가 게속 증가할수 있음. 비대해짐.
  //따라서 listener만을 별도로 분리.
    elButton.addEventListener("click", function(e) {
      buttonHandler(e,elList);
    }, false);

  //다른 부분을 클릭하면 리스트 닫기
  elBody.addEventListener("click", function(e){
    if(e.elTarget.id != "Layer1" && elList.style.display === "block") {
     elList.style.display = "none";
    }
  }, false);
}

function buttonHandler(e,elList) {
      e.preventDefault();
      if(elList.style.display ==="none") elList.style.display = "block";
      else elList.style.display = "none";
      e.stopPropagation();
}

//델리게이트 

window.addEventListener("load", function(){
  //동사+명사 (무엇을하다) > toggleGenreList();
  profileListOpenClose();
});


