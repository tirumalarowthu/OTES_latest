const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParagraphQuestionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  subtype: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

const ParagraphQuestion = mongoose.model('ParagraphQuestion', ParagraphQuestionSchema);

module.exports = ParagraphQuestion;
