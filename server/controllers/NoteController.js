var express = require('express');
var router = express.Router();
var Note = require('../models/Note');
var Profile = require('../models/Profile');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));

// post request to /notes
router.post('/', function(request, response){
  // grab the text from the request body and save it as a new
  // note
  var noteText = request.body.text;
  var note = new Note({text: noteText});
  note.save();

  // get the id of the profile that was noted
  var profileId = request.body.profileId;
  // grab the profile with that id and
  Profile.findById(profileId, function(error, profile){
    // get the mongoose id of the recently saved note
    var noteId = note.id
    // push the note id in to the profile note array
    profile.notes.push(noteId);
    profile.save();
    response.redirect(request.get('referer'));
  })
})

module.exports = router;
