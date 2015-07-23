Parse.$ = jQuery;

Parse.initialize('A1HlJySQ3gfopy6J8YC6sghYM5yihOkCpXOrmbXb',
'4hyL5OUH4AKeQ5hus6xVH84FDirM2r0bI1JAQzKR');

$(function() {

  $(document).ready(init);
  // Ensure that each todo created has `content`.
  function init() {
    $('#submit').on('click', newIncident);
  }

  function newIncident(event) {
    event.preventDefault();
    var incident = new Parse.Object('Incident');
    var issue = $('#issue').val();
    var location = $('#location').val();
    var issuetype = $('input:radio:checked').attr('id');
    incident.set('issue', issue);
    incident.set('location', location);
    incident.set('issuetype', issuetype);
    incident.save(null, {
      success: function(incident){
        window.location.replace('home.html');
      },
      error: function(tag, error){
        alert('Sorry, there was an error saving your incident.');
      }
    });
  }
});
