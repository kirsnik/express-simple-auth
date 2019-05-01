const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const saltRounds = 10;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
});

// hash user password before saving into database
userSchema.pre('save', function(next){
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
