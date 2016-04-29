$(document).ready(function(){
  $('#searchButton').on('click', function(){
    var text = $('#search').val();
    if(text){
      $.ajax({
        url:'http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag='+text+'&api_key=fc169e28c0fedab5b7d93101e7f4c0d2&format=json',
        method: 'GET',
        success: function(data){
          console.log(data);
          for(var i=0; i<5; i++){
            var artistNames = (data["topartists"]["artist"][i]["name"]);

              $("#topArtist").append("<br/>" + artistNames);
          }

        }


      });
    }
  });
});
