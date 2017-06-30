var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
  text: String
});

module.exports = mongoose.model('Note', NoteSchema);
