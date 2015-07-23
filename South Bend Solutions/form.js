Parse.$ = jQuery;

Parse.initialize('QCZ62TDrKVsBjD3r8wwxzChHtDRJDZrCxcQ7hj1s',
'Q2fiAfBb5ZTFTYmrKRD1gxPbEYIjrGWJKSRKdmrU');

$(function() {
  $(document).ready(init);
  // Ensure that each todo created has `content`.
  function init() {
    $('#submit').on('click', storyUpload);
  }

  function storyUpload(){
    var fileUploadControl = $('#profilePhotoFileUpload')[0];
    if (fileUploadControl.files.length > 0) {
      var file = fileUploadControl.files[0];
      var name = 'photo.jpg';
      var parseFile = new Parse.File(name, file);
      parseFile.save().then(function() {
        var story = new Parse.Object('Story');
        var name = $('#name').val();
        var comment = $('#comments').val();
        var agerange = $("#agerange option:selected").text();
        story.set('comments', comment);
        story.set('name', name);
        story.set('photo', parseFile);
        story.set('agerange',agerange);
        story.save(null, {
          success: function(story){
            window.location.replace('./FCRB.html');
          },
          error: function(story, error){
            alert('Something went wrong, we were unable to save your story');
          }
        });
      }, function(error) {
          // The file either could not be read, or could not be saved to Parse.
          alert('Something went wrong, we were unable to save your image and story');
      });
    }
  }
});
