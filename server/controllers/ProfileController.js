var express = require('express');
var router = express.Router();
var Profile = require('../models/Profile');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));

// GET request to /profiles/view
router.get('/view', function(request, response){
  Profile.find(function(error, profiles){
    if(request.session.loggedIn === true){
      var theProfiles = {allProfiles: profiles, loggedIn: true};
      response.render('profiles', theProfiles);
    }else{
      response.redirect('/users/login');
    }
  })
})

// GET request to /profiles/view/:id
router.get('/view/:id', function(request, response){
  var id = request.params.id;
  Profile.findById(id).populate('notes').exec(function(error, profile){
    response.render('profile', profile);
  })
})

////////////////////////////////////////
////////////////////////////////////////
////////////// JSON API ////////////////
////////////////////////////////////////
////////////////////////////////////////

router.get('/', function(request, response){
  //send all the profiles
  Profile.find(function(error, profiles){
    response.json(profiles);
  });
})

// Get to /profiles/id
router.get('/:id', function(request, response){
  //send specific profile with that id
  var id = request.params.id;
  Profile.findById(id, function(error, profile){
    response.json(profile);
  })
})

router.post('/', function(request, response){
  //create a new profile
  var profile = new Profile({ name: request.body.name,
                        pages: request.body.pages,
                        author: request.body.author,
                        isbn: request.body.isbn
  });
  profile.save();
  response.json(profile);
})

router.patch('/:id', function(request, response){
  //update a profile by id
  var id = request.params.id;
  Profile.findById(id, function(error, profile){
    profile.name = request.body.name;
    profile.pages = request.body.pages;
    profile.author = request.body.author;
    profile.isbn = request.body.isbn;
    profile.save();
    response.json(profile);
  })
})

router.delete('/:id', function(request, response){
  //delete a profile by id
  var id = request.params.id;
  Profile.findById(id, function(error,profile){
    profile.remove();
    response.json("success");
  })
})

module.exports = router;
