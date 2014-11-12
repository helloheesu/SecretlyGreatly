/**
 * Created by jjungmac on 2014. 11. 12..
 */
var express = require('express');


function loadMovies(callbackFunction) {

    client.query('SELECT * FROM movie WHERE id="'+username+'";', function (error, result, fields) {
        console.log('isRightAuth called');
        if(error) {
            console.log('쿼리 문장에 오류가 있습니다.');
            response.redirect('/card');
        } else {

            var movieArray = result;
            var sBooks = _makeBookElement(aBookList,sTemplate);
            if (callbackFunction && typeof ( callbackFunction ) == "function" )
            { callbackFunction (sBooks); }
            // Read more: http://mrbool.com/callback-functions-in-javascript/28614#ixzz3Dq7BZV9N
        }
        }
        console.log('hi');
        // response.redirect('/login');
    });
    var URL = 'database_array';
    var request = new XMLHttpRequest();
    var sTemplate = ' <div class="card_wrap size_1x1 "><div class="card_shadow"></div><div class="poster_container"><div class ="expected_rate_container"><span class="my_rate"> <img class="small_profile" src="http://placehold.it/25x25" /></span><span class="rating"><%score%></span> </div><img class="poster" src="<%imageLink%>" alt=""/> <div class="top_gradation"></div><div class="hover_container"><div class="black_bg"></div><div class="hover_contents"><div class="movie_title"><%title%></div><div class="star_rate"><div class="star_container"><span class="star half left" data-value=0.5></span><span class="star half right" data-value=1></span><span class="star half left" data-value=1.5></span><span class="star half right" data-value=2></span><span class="star half left" data-value=2.5></span><span class="star half right" data-value=3></span><span class="star half left" data-value=3.5></span><span class="star half right" data-value=4></span><span class="star half left" data-value=4.5></span><span class="star half right" data-value=5></span></div></div><div class="wish_btn_container"><div class="wish"><span class="icon"></span><span class="text">보고싶어요</span></div><div class="no_wish"><span class="icon"></span><span class="text">그만 볼래요</span> </div></div></div> </div></div><div class="reason"></div> </div>';

    request.open('GET' , URL , true);
    request.send();
    request.onreadystatechange = function (event) {

        if (request.readyState == 4 && request.status == 200) {
            var loadedData = eval('(' + request.responseText +')' );
            var aMovieList;
            aMovieList = loadedData.movies;
            var sMovies = makeMovieElement(aMovieList,sTemplate);
            if (callbackFunction && typeof ( callbackFunction ) == "function" )
            { callbackFunction (sMovies); }
            // Read more: http://mrbool.com/callback-functions-in-javascript/28614#ixzz3Dq7BZV9N
        }
    };

}

function makeMovieElement(aMovieList) {

    var sTemplate = ' <div class="card_wrap size_1x1 "><div class="card_shadow"></div><div class="poster_container"><div class ="expected_rate_container"><span class="my_rate"> <img class="small_profile" src="http://placehold.it/25x25" /></span><span class="rating"><%score%></span> </div><img class="poster" src="<%imageLink%>" alt=""/> <div class="top_gradation"></div><div class="hover_container"><div class="black_bg"></div><div class="hover_contents"><div class="movie_title"><%title%></div><div class="star_rate"><div class="star_container"><span class="star half left" data-value=0.5></span><span class="star half right" data-value=1></span><span class="star half left" data-value=1.5></span><span class="star half right" data-value=2></span><span class="star half left" data-value=2.5></span><span class="star half right" data-value=3></span><span class="star half left" data-value=3.5></span><span class="star half right" data-value=4></span><span class="star half left" data-value=4.5></span><span class="star half right" data-value=5></span></div></div><div class="wish_btn_container"><div class="wish"><span class="icon"></span><span class="text">보고싶어요</span></div><div class="no_wish"><span class="icon"></span><span class="text">그만 볼래요</span> </div></div></div> </div></div><div class="reason"></div> </div>';

    function _replaceAll(sValue, param1, param2) {
        return sValue.split(param1).join(param2);
    }
    var pattern = {
        title : '<%Title%>',
        score : '<%score%>',
        img : '<%imageLink%>'
    };

    var result = [];

    aMovieList.forEach(function(item){
        result.push(
            _replaceAll(pattern.title, item.name).replace(pattern.img, item.imgSrc).replace('4.5',item.rate));
    });
    var final = result.join('');
    return final;

}



exports.customAjax = customAjax;