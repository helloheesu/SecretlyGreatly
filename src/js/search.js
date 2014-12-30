/**
 * Created by jjungmac on 2014. 12. 29..
 */
;

var searchbar = document.getElementById("search_query");
var movielist= "";

function showMovie(e) {
    var searchresult = document.querySelector(".result_container");

    function closeEle(targetElement) {
        targetElement.style.display = 'none';
    }
    function showEle(targetElement) {
        targetElement.style.display = 'block';
    }

    function addURLParam(url, name, value) {
        url += (url.indexOf("?") === -1 ? "?" : "&");
        url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
        return url;
    }

    function getData(e){
        var request = new XMLHttpRequest();
        var url = "/search/ajax";
        url = addURLParam(url,"query", e.target.value);
        request.open("GET" , url , true);
        request.send(null);

        request.onreadystatechange = function() {
            if(request.readyState === 4 && request.status === 200) {
                movielist = request.responseText;
                console.log(movielist);
                searchresult.innerHTML = "";
                searchresult.insertAdjacentHTML('beforeend',movielist);
                if(movielist === "") {
                    closeEle(searchresult.parentNode);
                } else {
                    showEle(searchresult.parentNode);
                }
            }
        };
    }

    function changeSearchBarValue() {
        var item = searchresult.querySelector(".on .search_title");
        var tmp = item.innerHTML;
        searchbar.value = tmp;
    }

    switch(e.keyCode) {
        case 27: //esc
            closeEle(searchresult.parentNode);
            break;
        case 38:
        case 40: // 방향키 위아래 위위아래
            if (movielist !== "") {
                var item = searchresult.querySelector(".on");
                console.log(item);
                if ( item === null) {
                    $("#list0").addClass("on");
                } else {
                    var lstId = $(item).attr('id');
                    var lstIndex = parseInt(lstId.charAt(lstId.length - 1), 10);
                    if (!((lstIndex === 0 && e.keyCode === 38)
                        || (lstIndex === 9 && e.keyCode === 40))) {
                        $("#" + lstId).removeClass("on");
                        if (e.keyCode === 38) {
                            $("#list" + (lstIndex - 1)).addClass("on");
                        } else {
                            $("#list" + (lstIndex + 1)).addClass("on");
                        }
                    }
                }
                changeSearchBarValue();
            }
            break;
        case 17:
        case 25:
        case 192:
        case 16:
        case 20:
        case 189:
        case 187:
        case 220:
        case 18:
        case 145:
        case 19:
        case 45:
        case 33:
        case 34:
        case 144:
        case 111:
        case 106:
        case 109:
        case 107:
        case 46:
        case 113:
        case 114:
        case 119:
        case 120:
        case 121:
        case 122:
        case 37:
        case 39:
            break;
        default:
            if (e.target.value !== "") {
                getData(e);
            } else {
                closeEle(searchresult.parentNode);
            }
            break;
    }
    //if(e.keyCode === 17 || e.keyCode === 25 //ctrl
    //    || e.keyCode === 192 //`
    //    || e.keyCode === 16 //Shift
    //    || e.keyCode === 20 //Caps Lock
    //    || e.keyCode === 189 //-
    //    || e.keyCode === 187 //=
    //    || e.keyCode === 220 //\
    //    || e.keyCode === 18 || e.keyCode === 21 //Alt
    //    || e.keyCode === 145 //Scroll Lock
    //    || e.keyCode === 19 //Pause Break
    //    || e.keyCode === 45 //Insert
    //    || e.keyCode === 33 //Page Up
    //    || e.keyCode === 34 //Page Down
    //    || e.keyCode === 144 //Num Lock
    //    || e.keyCode === 144 //Num Lock
    //    || e.keyCode === 111 || e.keyCode === 106 || e.keyCode === 109 || e.keyCode === 107 ///*-+
    //    || e.keyCode === 46 //.
    //    || e.keyCode === 113 || e.keyCode === 114 || e.keyCode === 119 || e.keyCode === 120
    //    || e.keyCode === 121 || e.keyCode === 122//F2 ~ F11
    //    || e.keyCode === 37 || e.keyCode === 39 //<- ->키
    //){
    //    return;
    //}
}


searchbar.addEventListener("keyup", function( e ) {
    // prevent default action
    showMovie(e);
}, false);
