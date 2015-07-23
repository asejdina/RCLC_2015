Parse.$ = jQuery;

Parse.initialize('L6ShGalrKTMHYyEZY4c9sLqPWQIjWMTz08Hf9hdw',
'W0CAhMkDQWEMWDIabWElRIq17xCEz1hv3iLTZWfd');

$(function() {

  var map;
  var markers = [];


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

          createMarker(address, id);
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

  function createMarker(address, id){
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': address }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();
        var latLng = new google.maps.LatLng(lat,lng);
        var marker = new google.maps.Marker({map: map, position: latLng, id: id});
        // markers.push(marker);

        google.maps.event.addListener(marker, 'click', function() {
            var destination = Parse.Object.extend('Destination');
            var query = new Parse.Query(destination);
            query.equalTo("objectId", this.id)
            query.find({
              success: function(results){
                for (var i = 0; i < results.length; i++) {
                  var object = results[i];
                  var html =  '<div class="infoWrapper">' +
                              '<div class="destInfo">' +
                              '<h2>Destination:</h2>' +
                              object.get('name') +
                              '<h2>Address:</h2>' +
                              object.get('address') +
                              '<h2>Cost of Programs:</h2>' +
                              object.get('cost') +
                              '<h2>Programs:</h2>' +
                              object.get('programs') +
                              '</div>' +
                              '</div>';
                  $('#info').empty();
                  $('#info').append(html);
                }
              },
              error: function(error) { alert('Error: ' + error.code + ' ' + error.message); }
            });

            $('#info').css('display', 'block');
          });
      } else {
        console.log("Request failed.")
      }
    });
  }
});
