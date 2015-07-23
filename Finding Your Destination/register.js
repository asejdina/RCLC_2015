Parse.$ = jQuery;

Parse.initialize('L6ShGalrKTMHYyEZY4c9sLqPWQIjWMTz08Hf9hdw',
'W0CAhMkDQWEMWDIabWElRIq17xCEz1hv3iLTZWfd');

(function(){

  $(document).ready(init);

  function init() {
    $('#submitDestination').on('click', newDestination);
  }

  function newDestination(event) {
    event.preventDefault();
    var destination = new Parse.Object('Destination');
    var name = $('#name').val();
    var address = $('#address').val();
    var programs = $('#programs').val();
    var website = $('#website').val();
    var cost = $('#cost option:selected').text();
    var type = $('#type option:selected').text();

    destination.set('name', name);
    destination.set('address', address);
    destination.set('programs', programs);
    destination.set('website', website);
    destination.set('cost', cost);
    destination.set('type', type);

    destination.save(null, {
      success: function(destination){
        window.location.replace('home.html');
      },
      error: function(destination, error){
        alert('error code '+error.code+': '+error.message);
      }
    });
  }
})();
