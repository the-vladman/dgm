var express = require('express'),
  fs = require('fs'),
  mongoose = require('mongoose'),
  path = require('path'),
  rimraf = require('rimraf'),
  config = require('../config/app'),
  Category = require('../models/category'),
  Utils = require('../lib/utils'),
  Session = require('../lib/session'),
  router = express.Router(),
  _getRefs = function() {
    return [{
      field: 'section',
      select: 'name slug type'
    }];
  };

router.get('', function(req, res, next) {
  var filters = ['name', 'section', 'slug', 'type'];

  Utils.paginate(Category, filters, _getRefs(), req, res, next);
});

router.get('/:id', function(req, res, next) {
  var query = (mongoose.Types.ObjectId.isValid(req.params.id)) ? {
      _id: mongoose.Types.ObjectId(req.params.id)
    } : {
      slug: req.params.id
    },
    cursor = Category.findOne(query),
    callback = function(err, category) {
      if (err || !category) {
        err = new Error('Invalid category id');
        err.status = 404;
        next(err);
      } else {
        res.json(category);
      }
    };

  if (req.query.expanded && req.query.expanded === 'true') {
    var refs = _getRefs();
    for (var i = 0; i < refs.length; i++) {
      cursor.populate(refs[i].field, refs[i].select);
    }

    cursor.exec(callback);
  } else {
    cursor.exec(callback)
  }
});

router.post('/', Session.validate, function(req, res, next) {
  var moveFile = function(field, category) {
    Utils.move(req.body[field], path.join(config.uploads_path, category.id), function(e, file) {
      category[field] = file;
      category.save();
    });
  };

  if (req.session.access_level > 2) {
    var err = new Error('Permission denied');
    err.status = 401;
    next(err);
  } else {
    if (req.uploading) {
      Utils.upload(req, req.body.file, path.join(config.uploads_tmp_path), function(e, file) {
        if (e) {
          next(e);
        } else {
          res.json(file);
        }
      });
    } else {
      Category.create({
        description: req.body.description,
        extras: req.body.extras,
        name: req.body.name,
        section: req.body.section,
        slug: req.body.slug,
        type: req.body.type
      }, function(err, category) {
        if (err || !category) {
          err = new Error('Invalid category data');
          err.status = 403;
          next(err);
        } else {
          if (req.body.cover_photo || req.body.grid_photo) {
            if (req.body.cover_photo) {
              moveFile('cover_photo', category);
            }

            if (req.body.grid_photo) {
              moveFile('grid_photo', category);
            }
          }

          res.json(category);
        }
      });
    }
  }
});

router.put('/:id', Session.validate, function(req, res, next) {
  var uploading = {
      cover_photo: false,
      grid_photo: false
    },
    moveImg = function(field, category) {
      Utils.move(req.body[field], path.join(config.uploads_path, category.id), function(e, file) {
        category[field] = file;
        category.save(updated);
      });
    },
    updated = function(err, category) {
      res.json(category);
    };

  Category.findById(req.params.id, function(err, category) {
    if (err || !category) {
      err = new Error('Invalid category id');
      err.status = 404;
      next(err);
    } else {
      for (var key in req.body) {
        if (key == 'cover_photo' || key == 'grid_photo') {
          if (category[key] == undefined || category[key].path != req.body[key].path) {
            uploading[key] = true;
          }
          continue;
        }

        category[key] = req.body[key];
      }

      if (uploading.cover_photo || uploading.grid_photo) {
        if (uploading.cover_photo) {
          if (category.cover_photo) {
            fs.unlink(category.cover_photo.path, function() {
              moveImg('cover_photo', category);
            });
          } else {
            moveImg('cover_photo', category);
          }
        }

        if (uploading.grid_photo) {
          if (category.grid_photo) {
            fs.unlink(category.grid_photo.path, function() {
              moveImg('grid_photo', category);
            });
          } else {
            moveImg('grid_photo', category);
          }
        }
      } else {
        category.save(updated);
      }
    }
  });
});

router.delete('/:id', Session.validate, function(req, res, next) {
  if (req.session.access_level > 2) {
    var err = new Error('Permission denied');
    err.status = 401;
    next(err);
  } else {
    var removed = function(err, category) {
      res.json(category);
    };

    Category.findById(req.params.id, function(err, category) {
      if (err || !category) {
        err = new Error('Invalid category id');
        err.status = 404;
        next(err);
      } else {
        rimraf(path.join(config.uploads_path, category.id), function() {
          category.remove(removed);
        });
      }
    });
  }
});

module.exports = router;
