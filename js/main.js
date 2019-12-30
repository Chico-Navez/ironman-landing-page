
var im_description;
var im_picture;
var im_comics;
var characterId = '1009368'; 

function getMarvelCharacter() {                                                                                 
  var timestamp = new Date().getTime();
  var hash = $.md5(timestamp + PRIV_KEY + PUBLIC_KEY).toString();    
  var url = 'https://gateway.marvel.com:443/v1/public/characters/' + characterId;

  $.getJSON(url, {
    ts: timestamp,
    apikey: PUBLIC_KEY,
    hash: hash
    })
    .done(function(data) {      	
		im_description = data.data.results[0].description;
		im_picture = data.data.results[0].thumbnail.path + "." + data.data.results[0].thumbnail.extension;

		$('.im_picture').attr('src', im_picture);
		$('.im_description').text(im_description);
    getMarvelComics();

    })
    .fail(function(err){
      console.log(err);
    });
};
getMarvelCharacter();


function getMarvelComics() {                                                                                 
  var timestamp = new Date().getTime();
  var hash = $.md5(timestamp + PRIV_KEY + PUBLIC_KEY).toString();  
  var url = 'https://gateway.marvel.com:443/v1/public/characters/1009368/comics?format=comic&orderBy=issueNumber&limit=20';

  $.getJSON(url, {
    ts: timestamp,
    apikey: PUBLIC_KEY,
    hash: hash
    })
    .done(function(data) {
    im_comics = data.data.results;
    var i;
    for (i = 0; i < im_comics.length; ++i) {
        var comic = im_comics[i].thumbnail;
        if(comic.path != 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'){
          $('.slider').append('<img src="' + comic.path + '.' + comic.extension + '"/>');
        }
        
    }
    buildSlider();

    })
    .fail(function(err){
      console.log(err);
    });
};


function buildSlider(){
  $('.slider').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5.5,
    slidesToScroll: 4,
    margin: 20,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1
        }
      }
    ]
  });
}