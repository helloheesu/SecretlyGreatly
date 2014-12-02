/**
 * Created by jjungmac on 2014. 11. 12..
 */

function loadMovies(callbackFunction) {

    function _makeMovieElement(MovieList) {
        var temp = [];

        MovieList.forEach(function(item){
            temp.push(
                res.render('cardejs.ejs', {
                    title: item.movie_title,
                    score: '4.5',
                    imgeLink: item.movie_img_url
                }));
        });
        var final = temp.join('');
        return final;
    }
            var sMovie = _makeMovieElement(result);
            if (callbackFunction && typeof ( callbackFunction ) == "function") {
                callbackFunction(sMovie);
            }
            // Read more: http://mrbool.com/callback-functions-in-javascript/28614#ixzz3Dq7BZV9N
        // response.redirect('/login');
}


function loadMoreContent() {
    loadMovies(function(sMovies) {
        var cardContainer = document.getElementById('card_container');
        cardContainer.innerHTML += sMovies;
    });
}
