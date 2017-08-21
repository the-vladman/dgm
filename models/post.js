var mongoose = require('mongoose'),
  PostSchema = new mongoose.Schema({
    apple_store: {
      type: String,
      required: false
    },
    author: {
      type: String,
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    content: {
      type: String,
      required: true
    },
    cover_photo: {
      type: Object,
      required: false
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    creation_date: {
      type: Date,
      required: true,
      default: Date.now
    },
    datasets: {
      type: [String],
      required: false
    },
    datasets_ext: {
      type: [],
      required: false
    },
    edited_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    edition_date: {
      type: Date,
      required: false
    },
    external_link: {
      type: String,
      required: false
    },
    featured: {
      type: Boolean,
      required: true,
      default: false
    },
    google_play: {
      type: String,
      required: false
    },
    grid_photo: {
      type: Object,
      required: false
    },
    iframe: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    published_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    published_date: {
      type: Date,
      required: false
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    slider_photos: {
      type: [],
      required: false
    },
    slug: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    tag: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    web_link: {
      type: String,
      required: false
    }
  });

PostSchema.set('versionKey', false);
module.exports = mongoose.model('Post', PostSchema);
