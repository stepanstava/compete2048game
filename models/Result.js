const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  result: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('result', ResultSchema);
