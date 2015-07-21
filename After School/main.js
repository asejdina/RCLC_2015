Parse.$ = jQuery;

Parse.initialize('L6ShGalrKTMHYyEZY4c9sLqPWQIjWMTz08Hf9hdw',
'W0CAhMkDQWEMWDIabWElRIq17xCEz1hv3iLTZWfd');

$(function() {

  var map;
  var array = [];

  $(document).ready(init);

  function init() {
    var destination = Parse.Object.extend('Destination');
    var query = new Parse.Query(destination);

    query.find({
      success: function(results){
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          var id = object.id;
          var address = object.get('address');

          var geocoder = new google.maps.Geocoder();
          geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              var latitude = results[0].geometry.location.lat();
              var longitude = results[0].geometry.location.lng();
              createMarker(latitude, longitude, id);
            } else {
              alert("Request failed.")
            }
          });
        }
      },
      error: function(error) { alert('Error: ' + error.code + ' ' + error.message); }
    });


    initMap(41.67, -86.25, 12);
  }



// =============Map

  function initMap(lat, lng, zoom){
    var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function createMarker(lat, lng, id){
    var latLng = new google.maps.LatLng(lat,lng);
    var marker = new google.maps.Marker({map: map, position: latLng, id: id});

    google.maps.event.addListener(marker, 'click', function() {
        var destination = Parse.Object.extend('Destination');
        var query = new Parse.Query(destination);
        query.equalTo("objectId", this.id)
        query.find({
          success: function(results){
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              var photoURL = object.get("photo").url();
              var html =  '<div class="artWrapper">' +
                          '<div class="artInfo">' +
                          '<h2>Area:</h2>' +
                          object.get('area') +
                          '<h2>Time Registered:</h2>' +
                          object.get('createdAt') +
                          '<h2>Details:</h2>' +
                          object.get('comments') +
                          '</div>' +
                          '<div class="image" style="background-image: url('+photoURL+')""></div>' +
                          '</div>';
              $('#artModal').append(html);
            }
          },
          error: function(error) { alert('Error: ' + error.code + ' ' + error.message); }
        });

        $('#artModal').css('display', 'block');
      });
  }



});
