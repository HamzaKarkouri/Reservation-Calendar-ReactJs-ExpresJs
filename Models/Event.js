const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  worker: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required:true,

},

});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;