/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const autoPopulate = require('mongoose-autopopulate');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: [5, 'title should be more than 5 characters'],
    required: [true, 'title is required'],
  },
  author: {
    type: String,
    minLength: [3, 'author name should be more 5 characters'],
    required: [true, 'author is required'],
  },
  url: {
    type: String,
    validate: {
      validator: (value) => /^http|https:\/\/\S+(\/\S+)*(\/)?$/.test(value),
      message: 'invalid URL',
    },
    required: [true, 'url is required'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: {
      maxDepth: 1,
      select: ['username', 'name', 'id'],
    },
    required: [true, 'user is required'],
  },
  likes: {
    type: Number,
    default: 0,
  },
});

blogSchema.set('toJSON', {
  transform: (_doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

blogSchema.plugin(autoPopulate);

module.exports = mongoose.model('Blog', blogSchema);
