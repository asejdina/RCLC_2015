Parse.$ = jQuery;

Parse.initialize('UdGQSgye4B4IkEZwax2e1EwHwMQXmdYIEvzgeGu2',
'XlsuOL3zy9QsCsSRhCFcLWViq17X0IyzlFLxwi59');

$(function() {

  var map;
  var array = [];

  $(document).ready(init);
  // Ensure that each todo created has `content`.
  function init() {
    $('#submitPhoto').on('click', photoUpload);
    var tag = Parse.Object.extend('Tag');
    var query = new Parse.Query(tag);
    query.find({
      success: function(results){
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          var location = object.get('location').toJSON();
          var latitude = location.latitude;
          var longitude = location.longitude;
          createMarker(latitude, longitude);
        }
      },
      error: function(error) { alert("Error: " + error.code + " " + error.message); }
    });
    initMap(41.67, -86.25, 12);
  }


  function initMap(lat, lng, zoom){
    var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function createMarker(lat, lng){
    var latLng = new google.maps.LatLng(lat,lng);
    console.log(latLng);
    new google.maps.Marker({map: map, position: latLng});
  }


  function photoUpload(){
    var fileUploadControl = $('#profilePhotoFileUpload')[0];
      if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var name = 'photo.jpg';
        var parseFile = new Parse.File(name, file);
        parseFile.save().then(function() {
          var tag = new Parse.Object('Tag');
          var comment = $('#comments').val();
          var area = $('#area').val();
          var type = $('input:radio:checked').attr('id');
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                var location = new Parse.GeoPoint(lat,lon);
                tag.set('comments', comment);
                tag.set('area', area);
                tag.set('type', type);
                tag.set('photo', parseFile);
                tag.set('location', location);
                tag.save(null, {
                  success: function(tag){
                    window.location.replace('Positive Effects.html');
                  },
                  error: function(tag, error){
                    alert('YOU WHACKED THIS UP!!!!');
                  }
                });
              });
          } else {
              alert("Geolocation is not supported by this browser.");
          }

        }, function(error) {
          // The file either could not be read, or could not be saved to Parse.
        });
      }
  }






});
