var mongoose = require('mongoose'),
  SettingSchema = new mongoose.Schema({
    edited_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    edition_date: {
      type: Date,
      required: false
    },
    name: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    value: {
      type: String,
      required: true,
    },
    cover_photo: {
      type: Object,
      required: false
    }
  });

module.exports = mongoose.model('Setting', SettingSchema);
