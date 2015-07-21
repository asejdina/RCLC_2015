Parse.$ = jQuery;

Parse.initialize('QCZ62TDrKVsBjD3r8wwxzChHtDRJDZrCxcQ7hj1s',
'Q2fiAfBb5ZTFTYmrKRD1gxPbEYIjrGWJKSRKdmrU');

$(function() {

  $(document).ready(init);
    // Ensure that each todo created has `content`.
  function init() {
    var Story = Parse.Object.extend("Story");
    var query = new Parse.Query(Story);
    query.descending("createdAt");
    //query.equalTo("playerName", "Dan Stemkoski");
    query.find({
      success: function(results) {
        //alert("Successfully retrieved " + results.length + " scores.");
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          var photoURL = object.get("photo").url();
          var html =  '<div class="biobox">' +
                      '<div class="image" style="background-image: url('+photoURL+')""></div>' +
                      '<div class="description">' +
                      '<h2>' + object.get('name') + '</h2>' +
                      '<p>Age Range:' + object.get('agerange') + '</p>' +
                      '<p>' + object.get('comments') + '</p>' +
                      '</div>' +
                      '</div>';

          $("#bios").append(html);
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
