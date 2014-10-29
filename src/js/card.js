
$(".card_wrap").hover(function () {
    $(this).toggleClass( "active" );
});
$(".card_wrap").hover(function () {
    var stars;
    stars = $(".star.half" , this);
    $(stars).hover(function () {
            $(this).addClass("hover");
            var target_value = $(this).attr('data-value');
            $.each(stars, function() {
                if($(this).attr('data-value') <= target_value) {
                    $(this).addClass("over");
                }
            });
        },
        function () {
            var target_value;
            $(this).removeClass('hover');
            target_value = $(this).attr('data-value');
            $.each(stars, function() {
                if($(this).attr('data-value') <= target_value) {
                    $(this).removeClass("over");
                }
            });
        });
        $(stars).click(function () {
            var target_value = $(this).attr('data-value'), output;
            output = '<h1>' + target_value + '</h1>';
            $('body').append(output);
        });
},function () {
        $(".star.half" , this).off();
    }
);
