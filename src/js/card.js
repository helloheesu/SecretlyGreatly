
/*
 카드 호버 이벤트
 TODO @jjung : 여기서 영화 데이터를 변수로 먼저 잡아주어야 한다.
 */
$(".card_wrap").hover(function () {

        $(this).addClass("active");
        // 별점 드래그 이벤트 연결
        var stars, target_value;
        stars = $("span.star.half" , this);
        $(stars).hover(function () {

                $(this).addClass("hover");
                target_value = $(this).attr('data-value');

                $.each(stars, function() {
                if($(this).attr('data-value') <= target_value) {
                    $(this).addClass("over");
                }
            });
        },
        function () {
            $(this).removeClass('hover');

            $.each(stars, function() {
                if($(this).attr('data-value') <= target_value) {
                    $(this).removeClass("over");
                }
            });
        });

        /*
         별점 클릭 이벤트 연결.
         현재 추출 데이터는 몇 점을 넣었는지만 반영.
         TODO @jjung :화면에 아웃풋을 보여주나 추 후 저장메세지로 변경.
         */
        $(this).click(function () {
            var output;
            output = '<h1>' + target_value + '</h1>';
            $('body').append(output);
        });
    },

    function () {
        $(this).removeClass("active");
        $("span.star.half",this).off();
    }
);
