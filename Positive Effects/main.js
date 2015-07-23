Parse.$ = jQuery;

Parse.initialize('UdGQSgye4B4IkEZwax2e1EwHwMQXmdYIEvzgeGu2',
'XlsuOL3zy9QsCsSRhCFcLWViq17X0IyzlFLxwi59');

$(function() {

  var map;
  var markers = [];

  $(document).ready(init);
  // Ensure that each todo created has `content`.
  function init() {

    $('.newTag').on('click', newTag);
    $('.closeModal').on('click', closeModal);
    $('#submitPhoto').on('click', photoUpload);
    //$('.cBox').on('click', checkBox);

    var tag = Parse.Object.extend('Tag');
    var query = new Parse.Query(tag);

    query.find({
      success: function(results){
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          var location = object.get('location').toJSON();
          var latitude = location.latitude;
          var longitude = location.longitude;
          var id = object.id;
          var type = object.get('type');
          if(object.get('type') === 'good'){
            var icon = ('./images/greenMarker.png');
          } else {
            var icon = ('./images/pinkMarker.png');
          }
          createMarker(latitude, longitude, id, type, icon);
        }
      },
      error: function(error) { alert('Error: ' + error.code + ' ' + error.message); }
    });
    initMap(41.67, -86.25, 12);
  }

//=========== Checkbox Check

  // function checkBox() {
  //   if($('.good:checked').length > 0){
  //     markers = jQuery.each(markers, function(m){
  //       var type = m.type;
  //       if(type === 'good'){
  //         console.log(type);
  //       }
  //
  //
  //
  //     });
  //   }
  //   if($('.bad:checked').length > 0){
  //     markers = jQuery.map(markers, function(m){
  //       console.log(m.type);
  //     });
  //   }
  // }
  //
  // function clearMarkers() {
  //   setAllMap(null);
  // }
  // function setAllMap(map) {
  //   for (var i = 0; i < markers.length; i++) {
  //     markers[i].setMap(map);
  //   }
  // }


// =========FORM MODAL

  function newTag(){
    $('#formModal').css('display', 'block');
  }

  function closeModal(){
    $('#formModal').css('display', 'none');
    $('#artModal').css('display', 'none');
  }

// =============Map

  function initMap(lat, lng, zoom){
    var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function createMarker(lat, lng, id, type, icon){
    var latLng = new google.maps.LatLng(lat,lng);
    var marker = new google.maps.Marker({map: map, position: latLng, id: id, type: type, icon: icon});
    markers.push(marker);

    google.maps.event.addListener(marker, 'click', function() {
        var tag = Parse.Object.extend('Tag');
        var query = new Parse.Query(tag);
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
                          object.createdAt +
                          '<h2>Details:</h2>' +
                          object.get('comments') +
                          '</div>' +
                          '<div class="image" style="background-image: url('+photoURL+')""></div>' +
                          '</div>';
              $('#artModalInfo').empty();
              $('#artModalInfo').append(html);
            }
          },
          error: function(error) { alert('Error: ' + error.code + ' ' + error.message); }
        });

        $('#artModal').css('display', 'block');
      });
  }

//=============Form Submission


  function photoUpload(event){
    event.preventDefault();
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
              alert('Geolocation is not supported by this browser.');
          }

        }, function(error) {
          // The file either could not be read, or could not be saved to Parse.
        });
      }
  }






});
