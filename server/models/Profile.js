var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
  name: String,
  hometown: String,
  food: String,
  movie: String,
  book: String,
  music: String,
  superPower: String,
  skills: String,
  notes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Notes' }]
});

var profileModel = mongoose.model('Profile', ProfileSchema);

module.exports = profileModel;
