const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MCQQuestionSchema = new Schema({
  area: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  choice1: {
    type: String,
    required: true
  },
  choice2: {
    type: String,
    required: true
  },
  choice3: {
    type: String,
    required: true
  },
  choice4: {
    type: String,
    required: true
  },
  correct_choice: {
    type: String,
    required: true
  }
});

const MCQQuestion = mongoose.model('MCQQuestion', MCQQuestionSchema);

module.exports = MCQQuestion;
