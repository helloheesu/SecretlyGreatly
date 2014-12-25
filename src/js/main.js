window.onload = function(){
	rollImg();
}
function changeImg (e){
	//top_image가 잡힌다고 생각했는데 이벤트 위임 방식으로 그 안의 li가 잡힘
	var curImg = e.target;	//curImg가 의미하는 바는 현재 li이다.
	var nextImg = e.target.nextElementSibling;	// 다음 li를 찾는다 
	// console.log(e.target.nextSibling);	
	/* 원래 이렇게 쓰면 다음 li로 넘어갈거라고 생각했는데 html코드에서 공백이 있어서 text가 생긴다. 
	공백을 지우면 가독성이 떨어지기 때문에 코드는 그대로 두고 
	항상 nextElementSibling라고 써주면 될듯   
	*/

	if(!nextImg) {
		nextImg = e.target.parentNode.firstElementChild;	// 마지막 li가 끝나면 처음으로 돌아간다.
	}

	curImg.style.display = "none";
	nextImg.style.display = "block";

	//console.log("ene"+e.target.nextSibling.nextSibling);
	//console.log("eee"+e.target.nextElementSibling);
}

function rollImg(){
	var Img = document.getElementById('top_image');
   // Img.onclick = function(){alert('header 영역입니다.');}
   Img.addEventListener('click', changeImg, false);
   //setTimeout(changeImg(Img), 5000)
}

/*카드 호버시 이벤트*/
function card_mouse_enter() {
    $(this).addClass("hover");  
}

function card_mouse_leave() {
    $(this).removeClass("hover");
    $("span.star.half",this).off();
}

$(".card_wrap").hover(card_mouse_enter,card_mouse_leave);

