const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /https?:\/\/(?:www)?.{1,}\/?(#)?/;
        return regex.test(v);
      },
      message: (props) => `${props.value} is not a valid link!`
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regex = /https?:\/\/(?:www)?.{1,}\/?((#)?|.{1,})/;
        return regex.test(v);
      },
      message: (props) => `${props.value} is not a valid link!`
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    select: false
  }
})

module.exports = mongoose.model('card', articleSchema);