/**
 * Created by jjungmac on 2014. 11. 12..
 */
var mysql = require('mysql');
// $ mysql -u root -pdb1004 test
var client = mysql.createConnection({
    user: 'root',
    password: 'tomntoms',
    'database': 'movies'
});

function loadMovies(callbackFunction) {

    function _makeMovieElement(MovieList) {

        var sTemplate = ' <div class="card_wrap size_1x1 "><div class="card_shadow"></div><div class="poster_container"><div class ="expected_rate_container"><span class="my_rate"> <img class="small_profile" src="http://placehold.it/25x25" /></span><span class="rating"><%score%></span> </div><img class="poster" src="<%imageLink%>" alt=""/> <div class="top_gradation"></div><div class="hover_container"><div class="black_bg"></div><div class="hover_contents"><div class="movie_title"><%title%></div><div class="star_rate"><div class="star_container"><span class="star half left" data-value=0.5></span><span class="star half right" data-value=1></span><span class="star half left" data-value=1.5></span><span class="star half right" data-value=2></span><span class="star half left" data-value=2.5></span><span class="star half right" data-value=3></span><span class="star half left" data-value=3.5></span><span class="star half right" data-value=4></span><span class="star half left" data-value=4.5></span><span class="star half right" data-value=5></span></div></div><div class="wish_btn_container"><div class="wish"><span class="icon"></span><span class="text">보고싶어요</span></div><div class="no_wish"><span class="icon"></span><span class="text">그만 볼래요</span> </div></div></div> </div></div><div class="reason"></div> </div>';

        function _replaceAll(sValue, param1, param2) {
            return sValue.split(param1).join(param2);
        }

        var pattern = {
            title : '<%title%>',
            score : '<%score%>',
            img : '<%imageLink%>'
        };

        var temp = [];
        MovieList.forEach(function(item){
            temp.push(
                _replaceAll(sTemplate, pattern.title, item.movie_title).replace(pattern.img, item.movie_img_url).replace(pattern.score, '4.5'));
        });
        var final = temp.join('');
        return final;
    }
    client.query('SELECT * FROM moviedata WHERE movie_id between 0 AND 10;', function (error, result, fields) {
        console.log('loadMovie called');
        if(error) {
            console.log('쿼리 문장에 오류가 있습니다.');
        } else {
            var sMovie = _makeMovieElement(result);
            if (callbackFunction && typeof ( callbackFunction ) == "function") {
                callbackFunction(sMovie);
            }
            // Read more: http://mrbool.com/callback-functions-in-javascript/28614#ixzz3Dq7BZV9N
        }
        console.log('hi');
        // response.redirect('/login');
    });

}


function loadMoreContent() {
    loadMovies(function(sMovies) {
        var body = document.getElementById('cardWrap');
        body.innerHTML += sMovies;
    });
}

window.addEventListener('load', function() {
    loadMoreContent();
}, false);



exports.loadMoives = loadMovies;