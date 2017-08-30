var mongoose = require('mongoose'),
  CategorySchema = new mongoose.Schema({
    cover_photo: {
      type: Object,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    extras: {
      type: Array,
      required: false
    },
    grid_photo: {
      type: Object,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: false
    },
    slug: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  });

module.exports = mongoose.model('Category', CategorySchema);
