const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const autoPopulate = require('mongoose-autopopulate');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    default: '',
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    autopopulate: {
      maxDepth: 1,
      select: ['title', 'author', 'url', 'likes'],
    },
  }],
  password: String,
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(autoPopulate);
userSchema.set('toJSON', {
  transform: (_doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.password;
    delete returnedObject.__v;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
