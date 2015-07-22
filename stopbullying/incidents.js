Parse.$ = jQuery;

Parse.initialize('A1HlJySQ3gfopy6J8YC6sghYM5yihOkCpXOrmbXb',
'4hyL5OUH4AKeQ5hus6xVH84FDirM2r0bI1JAQzKR');

$(function() {

  $(document).ready(init);
    // Ensure that each todo created has `content`.
  function init() {
    var Incident = Parse.Object.extend("Incident");
    var query = new Parse.Query(Incident);
    //query.equalTo("playerName", "Dan Stemkoski");
    query.find({
      success: function(results) {
        //alert("Successfully retrieved " + results.length + " scores.");
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          var html =  '<div class="oneresult">' +
                      '<div class="section">' +
                      '<h3>Issue Type:</h3>' +
                      '<p>' + object.get('issuetype') + '</p>' +
                      '</div>' +
                      '<div class="section">' +
                      '<h3>Location:</h3>' +
                      '<p>' + object.get('location') + '</p>' +
                      '</div>' +
                      '<div class="section">' +
                      '<h3>Issue:</h3>' +
                      '<p>' + object.get('issue') + '</p>' +
                      '<div>' +
                      '</div>';
          $("#results").append(html);
        }
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
    //$('#submit').on('click', closeIncident);
  }
});

//   function closeIncident() {
//   ALL OF THIS NEEDS TO CHANGE TO CLOSE AN INCIDENT.
//     var incident = new Parse.Object('Incident');
//     var issue = $('#issue').val();
//     var location = $('#location').val();
//     var issuetype = $('input:radio:checked').attr('id');
//     incident.set('issue', issue);
//     incident.set('location', location);
//     incident.set('issuetype', issuetype);
//     incident.save(null, {
//       success: function(incident){
//         window.location.replace('home.html');
//       },
//       error: function(tag, error){
//         alert('Sorry, there was an error saving your incident.');
//       }
//     });
//   }
// });
