Parse.$ = jQuery;

Parse.initialize('L6ShGalrKTMHYyEZY4c9sLqPWQIjWMTz08Hf9hdw',
'W0CAhMkDQWEMWDIabWElRIq17xCEz1hv3iLTZWfd');

$(function() {

  $(document).ready(init);

  function init() {
    $('#submitDestination').on('click', newDestination);
  }


//=============Form Submission

  function newDestination() {

    console.log('you have started a new dest.');

    var destination = new Parse.Object('Destination');
    var name = $('#destinationName').val();
    var address = $('#destinationAddress').val();
    var programs = $('#desitinationPrograms').val();
    var website = $('#website').val();
    var cost = $('#cost option:selected').text();

    console.log(destination);

    destination.set('name', name);
    destination.set('address', address);
    destination.set('programs', programs);
    destination.set('website', website);
    destination.set('cost', cost);

    destination.save(null, {
      success: function(destination){
        window.location.replace('home.html');
      },
      error: function(tag, error){
        alert('Sorry, there was an error saving your destination.');
      }
    });
  }
});
