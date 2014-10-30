
/*
 카드 호버 이벤트
 TODO @jjung : 여기서 영화 데이터를 변수로 먼저 잡아주어야 한다.
 */

function card_mouse_enter() {

    $(this).addClass("hover");

    var stars, target_value;
    stars = $("span.star.half", this);

    function _star_over_animation(v , b) {
        $.each(stars, function () {
            if ($(this).attr('data-value') <= v) {
                if( b === true ) {
                    $(this).addClass("over");
                } else{
                    $(this).removeClass("over");
                }
            }
        });
    }
    /*
     별점 클릭 이벤트 연결.
     현재 추출 데이터는 몇 점을 넣었는지만 반영.
     TODO @jjung :화면에 아웃풋을 보여주나 추 후 뷰는 저장메세지, 로직은 포스트로 변경.
     */
    $(stars).click(function () {
        var output;
        output = '<h1>' + target_value + '</h1>';
        $('body').append(output);
    });


    // 별점 드래그 이벤트 연결
    $(stars).hover(function () {


            $(this).addClass("hover");
            target_value = $(this).attr('data-value');

            _star_over_animation(target_value , true);
        },
        function () {
            $(this).removeClass("hover");
            _star_over_animation(target_value , false);
        });


}

function card_mouse_leave() {
    $(this).removeClass("hover");
    $("span.star.half",this).off();
}


$(".card_wrap").hover(card_mouse_enter,card_mouse_leave);
