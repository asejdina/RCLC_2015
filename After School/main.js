Parse.$ = jQuery;

Parse.initialize('L6ShGalrKTMHYyEZY4c9sLqPWQIjWMTz08Hf9hdw',
'dvAGuNKjDWmxSm0woJRVEO7ePkAAkLD13ZHyzKV2');

$(function() {

  var map;
  var array = [];



  $(document).ready(init);
  // Ensure that each todo created has `content`.
  function init() {

    // $('.signUp').on('click', signUp);
    $('.closeModal').on('click', closeModal);
    $('#submitPhoto').on('click', photoUpload);

    // var tag = Parse.Object.extend('Destination');
    // var query = new Parse.Query(tag);
    //
    // query.find({
    //   success: function(results){
    //     for (var i = 0; i < results.length; i++) {
    //       var object = results[i];
    //       var address = object.get('destinationAddress');
    //       console.log(address);
    //       var id = object.id;
    //       createMarker(latitude, longitude, id);
    //     }
    //   },
    //   error: function(error) { alert('Error: ' + error.code + ' ' + error.message); }
    // });
    initMap(41.67, -86.25, 12);
  }



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

  function createMarker(lat, lng, id){
    var latLng = new google.maps.LatLng(lat,lng);
    var marker = new google.maps.Marker({map: map, position: latLng, id: id});

    // google.maps.event.addListener(marker, 'click', function() {
    //     var tag = Parse.Object.extend('Destination');
    //     var query = new Parse.Query(tag);
    //     query.equalTo("objectId", this.id)
    //     query.find({
    //       success: function(results){
    //         for (var i = 0; i < results.length; i++) {
    //           var object = results[i];
    //           var photoURL = object.get("photo").url();
    //           var html =  '<div class="artWrapper">' +
    //                       '<div class="artInfo">' +
    //                       '<h2>Area:</h2>' +
    //                       object.get('area') +
    //                       '<h2>Time Registered:</h2>' +
    //                       object.get('createdAt') +
    //                       '<h2>Details:</h2>' +
    //                       object.get('comments') +
    //                       '</div>' +
    //                       '<div class="image" style="background-image: url('+photoURL+')""></div>' +
    //                       '</div>';
    //           $('#artModal').append(html);
    //         }
    //       },
    //       error: function(error) { alert('Error: ' + error.code + ' ' + error.message); }
    //     });
    //
    //     $('#artModal').css('display', 'block');
    //   });
  }

  // =========ART MODAL



//=============Form Submission


  function photoUpload(){
    var fileUploadControl = $('#profilePhotoFileUpload')[0];
      if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var name = 'photo.jpg';
        var parseFile = new Parse.File(name, file);
        parseFile.save().then(function() {
          var tag = new Parse.Object('Destination');
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
