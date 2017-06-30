var express = require('express');
var router = express.Router();
var User = require('../models/User');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

router.use(bodyParser.urlencoded({extended: true}));

router.get('/register', function(request, response){
  response.render('register');
})

router.get('/login', function(request, response){
  response.render('login');
})

// /users/logout
router.get('/logout', function(request, response){
  request.session.loggedIn = false;
  response.redirect('/users/login');
});

router.get('/', function(request, response){
  //send all the users
  User.find(function(error, users){
    response.json(users);
  });
})

router.get('/:id', function(request, response){
  //send specific user with that id
  var id = request.params.id;
  User.findById(id, function(error, user){
    response.json(user);
  })
})

// POST request to /users
router.post('/', function(request, response){
  //create a new user
  bcrypt.hash(request.body.password, 10, function(error, hash){
    var user = new User({email: request.body.email,
                        password: hash
                        })
    user.save();
    request.session.loggedIn = true;
    response.redirect('/profiles/view');
  })
})

//post request to /users/login
router.post('/login', function(request, response){

  // 1. find the user with the corresponding email address
  // 2. check if the password on that user matches
  //    the password from the request (hashed)
  User.findOne({email: request.body.email}, function(err, user){
    // check if there is a user that was returned from the DB
    if(user){
      bcrypt.compare(request.body.password, user.password, function(error, match){
        if(match === true){
          request.session.loggedIn = true;
          response.redirect("/profiles/view");
        }else{
          response.redirect('/users/login');
        }
      })
    }else{
      response.redirect('/users/login');
    }
  })
})

router.patch('/:id', function(request, response){
  //update a user by id
  var id = request.params.id;
  User.findById(id, function(error, user){
    user.name = request.body.name;
    user.pages = request.body.pages;
    user.author = request.body.author;
    user.isbn = request.body.isbn;
    user.save();
    response.json(user);
  })
})

router.delete('/:id', function(request, response){
  //delete a user by id
  var id = request.params.id;
  User.findById(id, function(error,user){
    user.remove();
    response.json("success");
  })
})

module.exports = router;
