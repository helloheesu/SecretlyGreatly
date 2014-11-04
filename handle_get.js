console.log('js test');

parseUrlParameter = function (inputQuery) {
	if(!inputQuery) {console.log("no input query"); return;}
	// var query = inputQuery.substring(1,inputQuery.length -1);
	var query = inputQuery.substring(inputQuery.indexOf('?')+1,inputQuery.length);
	var parsedString = query.split(/[=&]+/);	// parsedString[even] : key / parsedString[odd] : value
	var result = {};
	for (var i = 0; i < parsedString.length; i += 2) {
		result[parsedString[i]] = parsedString[i+1];
	}
	return result;
};

getNewSelectedFilterElement = function (filter) {
	if(!filter) {console.log("no input filter"); return;}
	var newLi = document.createElement('li');
	var newSpanInLi = document.createElement('span');
	newSpanInLi.className = "text";
	var textIconHTML = '<a href=\"#\"><span class=\"text_icon\">x</span></a>';
	newSpanInLi.innerHTML = filter+ textIconHTML;
	newLi.appendChild(newSpanInLi);
	return newLi;
};

// 왓챠에서는 캐쉬 += 새로 받은 인자값;
// 여기선 단순히 appendChild(인자값) (== '캐쉬 = 새로 받은 인자값' 인 셈).
addSelectedFilterElement = function (filter) {	
	var newLi = getNewSelectedFilterElement(filter);
	// debugger
	var liWrapper = document.getElementsByClassName('selected_filter_wrapper')[0];
	// debugger
	liWrapper.appendChild(newLi);
	return newLi;	// just in case.
};

console.log("test:"+decodeURI(location.search));
var UrlValue = parseUrlParameter(decodeURI(location.search));
// document.onload = addSelectedFilterElement(UrlValue.genre);
// window.onload = addSelectedFilterElement(UrlValue.genre);
window.addEventListener('load', function(e){addSelectedFilterElement(UrlValue.genre);}, false);