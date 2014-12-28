
/*
 카드 호버 이벤트
 TODO @jjung : 여기서 영화 데이터를 변수로 먼저 잡아주어야 한다.
 */

function mouse_enter() {

    $(this).addClass("hover");

    var stars, target_value, isclicked;
    stars = $("span.star.half", this);
    target_value = 0;
    isclicked = false;

    function _star_over_animation(v, b) {
        if (b === true) { 
            $.each(stars, function () {
                if($(this).attr('data-value') <= v) {
                    $(this).addClass("over");
                } else {
                    $(this).removeClass("over");   
                }
            });
        } else {
            $.each(stars, function () {
                $(this).removeClass("over");   
            }); 
        }
            
            // if ($(this).attr('data-value') <= v) {
            //     if( b === true ) {
            //         $(this).addClass("over");
            //     } else{
            //         $(this).removeClass("over");
            //     }
            // } else {
            //     if( b === false ) {
            //         $(this).addClass("over");
            //     } else{
            //         $(this).removeClass("over");
            //     }
            // }
    }

    function _showDataLoadingPage() {
        console.log(target_value);       //콘솔 창에 클릭한 별점을 보여줌
    
        var x = document.getElementById("Director_score").value;
      
        // console.log(document.getElementById("Director_score").value);
    }


    function _changeStarValue() {
       console.log(target_value);

     // input type="hidden" name="Director_score" value="" >
     //ejs파일에서 이름에 맞는 value 값을 해당하는 값으로 동적으로 변환해줌


        
        _saveStarValuetoDb();//디비에 저장하도록 해주는 함수 호출 
    }

    // function _saveStarValuetoDb() {
  
    // }    

    /*
     별점 클릭 이벤트 연결.
     현재 추출 데이터는 몇 점을 넣었는지만 반영.
     TODO @jjung :화면에 아웃풋을 보여주나 추 후 뷰는 저장메세지, 로직은 포스트로 변경.
     */

    $(stars).click(function () {
        _showDataLoadingPage();
        isclicked = true;
        $("span.star.half",this).off();
        // target value가 리스트에 저장되이써야해.
        // 그래서 호버 이벤트 할떄마다 저장된 타겟벨류로 이니셜라이즈를 해야해. 
    });

    // 별점 드래그 이벤트 연결
    $(stars).hover(function () {
            $(this).addClass("hover");
            target_value = $(this).attr('data-value');

            _star_over_animation(target_value , true);
        },
        function () {
            if(isclicked === false) {
            $(this).removeClass("hover");
             _star_over_animation(target_value , false);
            }
        });
}

function mouse_leave() {
    $(this).removeClass("hover");
    $("span.star.half",this).off();
}

$(".star-card").hover(mouse_enter,mouse_leave);
