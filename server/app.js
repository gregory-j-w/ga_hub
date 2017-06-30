var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    path = require('path'),
    session = require('express-session'),
    Profile = require('./models/Profile');
    require('./db/db.js');

app.use(session( {
  secret: "The secret password is secret",
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}));

var UserController = require('./controllers/UserController');
var ProfileController = require('./controllers/ProfileController');
var NoteController = require('./controllers/NoteController');

app.use('/users', UserController);
app.use('/profiles', ProfileController);
app.use('/note', NoteController);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

server.listen(3000, function(){
  console.log('listening on port 3000');
})
