const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  issue: {
    type: String,
    // enum: [garbage, recycling, flooding, light, debris, pothole, traffic, other],
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
    // required: true
  },
  comments: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now()
  },
  photoUrl: {
    type: String,
    required: false
  },
  videoUrl: {
    type: String,
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

IssueSchema.methods.addUser = function(userId) {
  this.user = userId;
  return this.save();
};

IssueSchema.index({ location: '2dsphere' });

const Issue = mongoose.model('Issue', IssueSchema);
module.exports = Issue;
