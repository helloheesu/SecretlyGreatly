
var fs = require('fs');
var data = fs.readFileSync('cheerio_movieLink.json', 'utf8');
var options = JSON.parse(data).options;
var cheerio = require('cheerio');

// var result = {};

var request = require('request');


options.forEach(function (val, i, array) {
  request(val, function(err, res, body) {
    if(err) {console.log("err!"+err); throw err;}
    var $ = cheerio.load(body);
    var newObj = {};
    newObj.title = $(".header [itemprop=name]").text();
    
    newObj.poster = $("#img_primary img").attr('src');

    // newObj.directors = [];
    // newObj.directors = $("[itemprop=director]").each(function() { newObj.director.push($(this).text()); });
    newObj.directors = getItemPropArray($, 'director', '[itemprop=name]');
    newObj.writers = getItemPropArray($, 'creator', '[itemprop=name]');
    newObj.actors = getItemPropArray($, 'actor', '[itemprop=name]');

    newObj.genres = getItemPropArray($, 'genre', 'a');

    newObj.country = $(".txt-block h4:contains(Country:)").siblings("a").text();

    console.log(JSON.stringify(newObj));
    // result[val.url.split('/title/')[1]] = newObj;
    // console.log(JSON.stringify(result));
  });
});




function getItemPropArray($, prop, child) {
  var result = [];
  $("[itemprop="+prop+"] "+child).each(function() { result.push($(this).text()); });
  return result;
}
