var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    first_name: String,
    last_name: String,
    name: String,
    display: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    created_at: Date,
    updated_at: Date
});

// on every save, add the date
userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

userSchema.methods.createName = function() {
    this.name = this.first_name + " " + this.last_name;
    return this.name;
}

module.exports =  mongoose.model('User', userSchema);