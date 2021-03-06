$(document).ready(function(){
  $("#localStorageTest").submit(function(e) {
    e.preventDefault();
  });

  function init() {
    if (localStorage["search"]) {
      $('#search').val(localStorage["search"]);
    }
  }

  $('.stored').keyup(function () {
      localStorage[$(this).attr('search')] = $(this).val();
  });

  $('#localStorageTest').submit(function() {
      localStorage.clear();
  });

  $("#topArtist").click(function(event){
    bandName = $(event.target).text();
    $(event.target).append($('#artistInfoSmall'));
    var $summary = $('summary');
    var $img = $('img');
    $summary.empty();
    $('.media').empty();
    $img.empty();

    $.ajax({
      url: 'https://api.spotify.com/v1/search?query=' + bandName + '&offset=0&limit=20&type=artist',
      method: 'GET',
      success: function(data){
        var spotifyLink = (data["artists"]["items"][0]["external_urls"]["spotify"]);
        var spotifyButton = ('<iframe src="https://embed.spotify.com/?uri=' + spotifyLink + '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>');
        $(".media").append(spotifyButton)
      }
    });

    $.ajax({
      url: 'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+ bandName + '&api_key=fc169e28c0fedab5b7d93101e7f4c0d2&format=json',
      method: 'GET',
      dataType: 'json',
      success: function(data){
        var bandWiki = ((data)["artist"]["bio"]["summary"]);
        var bandPic = ((data)["artist"]["image"][2]["#text"]);
        $summary.append("<h3>" + bandWiki + "</h3>");
        $img.append('<img id="bandImg" src=' + bandPic + '/>')
      }
    })
  });

  $('#searchButton').on('click', function(e){
    var text = $('#search').val();
      $('#genreDescription').empty();
      $('#topArtist').empty();
    if(text){

      $.ajax({
        url: 'https://ws.audioscrobbler.com/2.0/?method=tag.getinfo&tag='+ text + '&api_key=fc169e28c0fedab5b7d93101e7f4c0d2&format=json',
        method: 'GET',
        success: function(data){
          e.preventDefault();
          var genreDescribe = (data["tag"]["wiki"]["summary"]);
          $("#genreDescription").append(genreDescribe + "<br/>" + "<br/>" + "The most tagged artists for this genre are:");
        }
      }),

      $.ajax({
        url:'https://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag='+text+'&api_key=fc169e28c0fedab5b7d93101e7f4c0d2&format=json',
        method: 'GET',
        success: function(data){
        e.preventDefault();
          for(var i=0; i<9; i++){
            var artistNames = (data["topartists"]["artist"][i]["name"]);
            var $element = $('<li>');
            $element.text(artistNames);
            $element.attr('data-artist', artistNames);

            $("#topArtist").append($element);
          }
          function addClickForArtist() {
            var els = $('li');

            for (var i = 0; i < els.length; i++) {
              $(els[i]).click(function(e) {
              })
            }
          }

        addClickForArtist();
        }
      });
    }
  });
});
